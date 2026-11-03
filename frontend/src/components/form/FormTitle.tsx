
interface FormTitleParams {
  title: string;
  subtitle: string
}

export const FormTitle = (params: FormTitleParams) => {
  return (
    <div className="auth-heading">
      <h2 className="auth-title">
          {params.title}
      </h2>
      {
        params.subtitle && (
          <p className="auth-subtitle">
            Please sign in to your account to continue
          </p>
        )
      }
    </div>
  )
}
