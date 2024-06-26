import logo from "@assets/images/logo.svg";
import { Link, useActionData, useNavigate, useNavigation, useRouteError, useSubmit } from "react-router-dom";
import { useForm } from "react-hook-form";
import { httpService } from "@core/http-service";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
const Register = () => {
  const {register,watch,handleSubmit ,formState:{errors}}=useForm()

  const {t} = useTranslation()
  
  const submitForm = useSubmit()

  const onSubmit = data => {
    const {confirmPassword, ...userData} = data
    submitForm(userData,{method:'post'})
  }
  const navigation = useNavigation()
  const isSubmiting = navigation.state !== 'idle'

  const isSuccessOpetation = useActionData()

  const navigate = useNavigate()

  const routErrors = useRouteError()

  useEffect(() => {
    if (isSuccessOpetation){
      setTimeout(() => {
        navigate('/login')
      },2000)
    }
  },[isSuccessOpetation])
 
  return (
    <>
    
                          <div className="text-center mt-4">
                            <img src={logo} style={{ height: "100px" }} />
                            <h1 className="h2">{t('register.title')}</h1>
                            <p className="lead">
                              {t('register.introMassage')}
                            </p>
                            <p className="lead">
                               قبلا ثبت نام کرده اید؟
                            <Link to='/login' className="me-2">
                             وارد شوید{" "}
                            </Link>
                            </p>
                          </div>

                        <div className="card">
                          <div className="card-body">
                            <div className="m-sm-4">
                             <form onSubmit={handleSubmit(onSubmit)}>
                              <div className="mb-3">
                                <label className="form-label">{t("register.mobile")}</label>
                                     <input {...register('mobile',{
                                      required:t("register.validation.mobileRequired"),
                                      minLength:11,
                                      maxLength:11
                                     })} className={`form-control form-control-lg ${errors.mobile && 'is-invalid'}`} />
                                     {
                                      errors.mobile && errors.mobile.type === 'required'&& (
                                        <p className="text-danger small mt-1 fw-bolder">
                                          {errors.mobile.message}
                                        </p>
                                      )
                                     }
                                     {
                                      errors.mobile && (errors.mobile.type === 'minLength' || errors.mobile.type === 'maxLength')&& (
                                        <p className="text-danger small mt-1 fw-bolder">
                                          {t("register.validation.mobileLength")}
                                        </p>
                                      )
                                     }
                              </div>
                              <div className="mb-3">
                                    <label className="form-label">{t("register.password")}</label>
                                    <input {...register('password',{
                                      required:t("register.validation.passwordRequired"),
                                     
                                     })} className={`form-control form-control-lg ${errors.password && 'is-invalid'}`} />
                                      {
                                      errors.password && errors.password.type === 'required'&& (
                                        <p className="text-danger small mt-1 fw-bolder">
                                          {errors.password.message}
                                        </p>
                                      )
                                     }
                              </div>
                              <div className="mb-3">
                                    <label className="form-label">{t("register.repeatPassword")}</label>
                                    <input {...register('confirmPassword',{
                                      required:t("register.validation.repeatPasswordRequired"),
                                      validate: value => {
                                        if(watch('password') !== value){
                                          return t("register.validation.notMatching")                                     }
                                      },
                                     
                                     })} className={`form-control form-control-lg ${errors.confirmPassword && 'is-invalid'}`} />
                                      {
                                      errors.confirmPassword && errors.confirmPassword.type === 'required'&& (
                                        <p className="text-danger small mt-1 fw-bolder">
                                          {errors.confirmPassword.message}
                                        </p>
                                      )
                                     }
                                     {
                                      errors.confirmPassword && errors.confirmPassword.type === 'validate' && (
                                        <p className="text-danger small fw-bolder mt-1">
                                          {errors.confirmPassword.message}
                                        </p>
                                      )
                                     }
                                     
                              </div>
                 
               
              <div className="text-center mt-3">
                <button type="submit" disabled={isSubmiting} className="btn btn-lg btn-primary">
                     {t('register.register')}
                   {/* {isSubmiting ? 'در حال انجام عملیات' : 'ثبت نام کنید'}  */}
                </button>
              </div>
              {
                isSuccessOpetation && (
                  <div className="alert alert-success text-success p-2 mt-3">
                    عملیات با موفقیت انجام شد
                  </div>
                )
              }
              {
               routErrors && (
                    <div className="alert alert-danger text-danger p-2 mt-3">
                      {
                       routErrors.response.data.map(error => <p>{error.description}</p>)
                      }
                    </div>
                )
              }
            </form>
          </div>
        </div>
      </div>

                        
    </>
  )
}  
export default Register

export async function registerAction({request}) {
  const formData = await request.formData()
  const data = Object.fromEntries(formData)
  const response = await httpService.post('/Users', data)
  return response.status === 200
}   