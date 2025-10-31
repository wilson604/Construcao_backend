const yup = require('yup')

const schema = yup.object().shape(
    {
        nome: yup.string().required("O campo nome é obrigatório"),
        descricao: yup.string().required("O campo descricao é obrigatório")
    }
)

async function validarDepartamento(res,req, next) {
    try {
        await schema.validate(req,body, { abortEarly: false })
        next()
    } catch (error) {
        return res.status(400).json({ erro: error.errors })
        }
}