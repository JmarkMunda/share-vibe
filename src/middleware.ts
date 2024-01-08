import { withAuth } from "next-auth/middleware";

export default withAuth(
  // `withAuth` augments your `Request` with the user's token.
  function middleware(req) {
    // console.log("middleware req: ", req.nextauth.token);
  },
  {
    pages: {
      signIn: "/login",
      signOut: "/login",
    },
  }
);
export const config = {
  matcher: "/((?!api|_next/static|_next/image|favicon.ico|login|register).*)",
};
