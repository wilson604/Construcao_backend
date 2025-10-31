const yup = require('yup')

const schema = yup.object().shape(
    {
        nome: yup.string().required("O campo nome é obrigatório"),
        descricao: yup.string().required("O campo descricao é obrigatório"),
        salario: yup.number()
        .min(1518.00, "salario não pode ser abaixo do minimo 1518.00")
        .required("O campo salario é obrigatório")
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