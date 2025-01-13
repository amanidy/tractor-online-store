declare module "*.page" {
  import { PageProps as BasePageProps } from "next";

  export type PageProps = BasePageProps & {
    params: Promise<{
      tractorId: string;
      detailId: string;
    }>;
  };
}
