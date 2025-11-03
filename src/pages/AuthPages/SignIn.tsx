import PageMeta from "../../components/common/PageMeta";
import AuthLayout from "./AuthPageLayout";
import SignInForm from "../../components/auth/SignInForm";

export default function SignIn() {
  return (
    <>
      <PageMeta
        title="LumenAdmin | Inicio Sesión"
        description=""
      />
      <AuthLayout>
        <SignInForm />
      </AuthLayout>
    </>
  );
}
