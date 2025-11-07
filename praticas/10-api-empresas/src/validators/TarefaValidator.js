const yup = require('yup');
const { isValidObjectId } = require('./IDValidator');

const createSchema = yup.object().shape({
  titulo: yup.string().required(),
  descricao: yup.string().required(),
  data_inicio: yup.date().required(),
  data_fim: yup.date().required().test('is-after', 'data_fim deve ser posterior a data_inicio', function(value) {
    const { data_inicio } = this.parent;
    if (!data_inicio || !value) return true;
    return new Date(value) > new Date(data_inicio);
  }),
  responsavel: yup.string().required().test('is-objectid', 'responsavel inválido', value => isValidObjectId(value)),
  projeto: yup.string().required().test('is-objectid', 'projeto inválido', value => isValidObjectId(value))
});

const updateSchema = yup.object().shape({
  titulo: yup.string(),
  descricao: yup.string(),
  data_inicio: yup.date(),
  data_fim: yup.date().test('is-after', 'data_fim deve ser posterior a data_inicio', function(value) {
    const { data_inicio } = this.parent;
    if (!data_inicio || !value) return true;
    return new Date(value) > new Date(data_inicio);
  }),
  responsavel: yup.string().test('is-objectid', 'responsavel inválido', value => !value || isValidObjectId(value)),
  projeto: yup.string().test('is-objectid', 'projeto inválido', value => !value || isValidObjectId(value))
});

module.exports = { createSchema, updateSchema };
