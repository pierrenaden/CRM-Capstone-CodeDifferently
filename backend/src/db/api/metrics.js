const db = require('../models');
const FileDBApi = require('./file');
const crypto = require('crypto');
const Utils = require('../utils');

const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

module.exports = class MetricsDBApi {
  static async create(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const metrics = await db.metrics.create(
      {
        id: data.id || undefined,

        name: data.name || null,
        value: data.value || null,
        recorded_at: data.recorded_at || null,
        importHash: data.importHash || null,
        createdById: currentUser.id,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await metrics.setRelated_user(data.related_user || null, {
      transaction,
    });

    return metrics;
  }

  static async bulkImport(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    // Prepare data - wrapping individual data transformations in a map() method
    const metricsData = data.map((item, index) => ({
      id: item.id || undefined,

      name: item.name || null,
      value: item.value || null,
      recorded_at: item.recorded_at || null,
      importHash: item.importHash || null,
      createdById: currentUser.id,
      updatedById: currentUser.id,
      createdAt: new Date(Date.now() + index * 1000),
    }));

    // Bulk create items
    const metrics = await db.metrics.bulkCreate(metricsData, { transaction });

    // For each item created, replace relation files

    return metrics;
  }

  static async update(id, data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const metrics = await db.metrics.findByPk(id, {}, { transaction });

    await metrics.update(
      {
        name: data.name || null,
        value: data.value || null,
        recorded_at: data.recorded_at || null,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await metrics.setRelated_user(data.related_user || null, {
      transaction,
    });

    return metrics;
  }

  static async remove(id, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const metrics = await db.metrics.findByPk(id, options);

    await metrics.update(
      {
        deletedBy: currentUser.id,
      },
      {
        transaction,
      },
    );

    await metrics.destroy({
      transaction,
    });

    return metrics;
  }

  static async findBy(where, options) {
    const transaction = (options && options.transaction) || undefined;

    const metrics = await db.metrics.findOne({ where }, { transaction });

    if (!metrics) {
      return metrics;
    }

    const output = metrics.get({ plain: true });

    output.related_user = await metrics.getRelated_user({
      transaction,
    });

    return output;
  }

  static async findAll(filter, options) {
    var limit = filter.limit || 0;
    var offset = 0;
    const currentPage = +filter.page;

    offset = currentPage * limit;

    var orderBy = null;

    const transaction = (options && options.transaction) || undefined;
    let where = {};
    let include = [
      {
        model: db.users,
        as: 'related_user',
      },
    ];

    if (filter) {
      if (filter.id) {
        where = {
          ...where,
          ['id']: Utils.uuid(filter.id),
        };
      }

      if (filter.name) {
        where = {
          ...where,
          [Op.and]: Utils.ilike('metrics', 'name', filter.name),
        };
      }

      if (filter.valueRange) {
        const [start, end] = filter.valueRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            value: {
              ...where.value,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            value: {
              ...where.value,
              [Op.lte]: end,
            },
          };
        }
      }

      if (filter.recorded_atRange) {
        const [start, end] = filter.recorded_atRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            recorded_at: {
              ...where.recorded_at,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            recorded_at: {
              ...where.recorded_at,
              [Op.lte]: end,
            },
          };
        }
      }

      if (
        filter.active === true ||
        filter.active === 'true' ||
        filter.active === false ||
        filter.active === 'false'
      ) {
        where = {
          ...where,
          active: filter.active === true || filter.active === 'true',
        };
      }

      if (filter.related_user) {
        var listItems = filter.related_user.split('|').map((item) => {
          return Utils.uuid(item);
        });

        where = {
          ...where,
          related_userId: { [Op.or]: listItems },
        };
      }

      if (filter.createdAtRange) {
        const [start, end] = filter.createdAtRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            ['createdAt']: {
              ...where.createdAt,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            ['createdAt']: {
              ...where.createdAt,
              [Op.lte]: end,
            },
          };
        }
      }
    }

    let { rows, count } = options?.countOnly
      ? {
          rows: [],
          count: await db.metrics.count({
            where,
            include,
            distinct: true,
            limit: limit ? Number(limit) : undefined,
            offset: offset ? Number(offset) : undefined,
            order:
              filter.field && filter.sort
                ? [[filter.field, filter.sort]]
                : [['createdAt', 'desc']],
            transaction,
          }),
        }
      : await db.metrics.findAndCountAll({
          where,
          include,
          distinct: true,
          limit: limit ? Number(limit) : undefined,
          offset: offset ? Number(offset) : undefined,
          order:
            filter.field && filter.sort
              ? [[filter.field, filter.sort]]
              : [['createdAt', 'desc']],
          transaction,
        });

    //    rows = await this._fillWithRelationsAndFilesForRows(
    //      rows,
    //      options,
    //    );

    return { rows, count };
  }

  static async findAllAutocomplete(query, limit) {
    let where = {};

    if (query) {
      where = {
        [Op.or]: [
          { ['id']: Utils.uuid(query) },
          Utils.ilike('metrics', 'name', query),
        ],
      };
    }

    const records = await db.metrics.findAll({
      attributes: ['id', 'name'],
      where,
      limit: limit ? Number(limit) : undefined,
      orderBy: [['name', 'ASC']],
    });

    return records.map((record) => ({
      id: record.id,
      label: record.name,
    }));
  }
};
