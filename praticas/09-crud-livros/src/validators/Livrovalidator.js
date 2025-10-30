const yup = require('yup');


const criarSchema = yup.object().shape({
titulo: yup.string().required('O campo \"titulo\" é obrigatório'),
autor: yup.string().required('O campo \"autor\" é obrigatório'),
editora: yup.string().required('O campo \"editora\" é obrigatório'),
ano: yup.number().typeError('O campo \"ano\" deve ser um número').required('O campo \"ano\" é obrigatório'),
preco: yup.number().typeError('O campo \"preco\" deve ser um número').required('O campo \"preco\" é obrigatório').min(0, 'O \"preco\" deve ser um número positivo')
});


const atualizarSchema = yup.object().shape({
titulo: yup.string().notRequired(),
autor: yup.string().notRequired(),
editora: yup.string().notRequired(),
ano: yup.number().typeError('O campo \"ano\" deve ser um número').notRequired(),
preco: yup.number().typeError('O campo \"preco\" deve ser um número').min(0, 'O \"preco\" deve ser um número positivo').notRequired()
});


function validarCriar(req, res, next) {
criarSchema.validate(req.body, { abortEarly: false })
.then(() => next())
.catch((err) => {
const errors = err.inner ? err.inner.map(e => e.message) : [err.message];
return res.status(400).json({ errors });
});
}


function validarAtualizar(req, res, next) {
// se body vazio, retornar erro
if (!req.body || Object.keys(req.body).length === 0) {
return res.status(400).json({ errors: ['Nenhum dado informado para atualização'] });
}


atualizarSchema.validate(req.body, { abortEarly: false })
.then(() => next())
.catch((err) => {
const errors = err.inner ? err.inner.map(e => e.message) : [err.message];
return res.status(400).json({ errors });
});
}


module.exports = {
validarCriar,
validarAtualizar
};