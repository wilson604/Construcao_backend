const yup = require('yup');

const createSchema = yup.object().shape({
  nome: yup.string().required(),
  descricao: yup.string().required(),
  data_inicio: yup.date().required(),
  data_fim: yup.date().required().test('is-after', 'data_fim deve ser posterior a data_inicio', function(value) {
    const { data_inicio } = this.parent;
    if (!data_inicio || !value) return true; // outros validadores cuidam de obrigatoriedade
    return new Date(value) > new Date(data_inicio);
  })
});

const updateSchema = yup.object().shape({
  nome: yup.string(),
  descricao: yup.string(),
  data_inicio: yup.date(),
  data_fim: yup.date().test('is-after', 'data_fim deve ser posterior a data_inicio', function(value) {
    const { data_inicio } = this.parent;
    if (!data_inicio || !value) return true;
    return new Date(value) > new Date(data_inicio);
  })
});

module.exports = { createSchema, updateSchema };
