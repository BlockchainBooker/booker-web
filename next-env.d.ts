/// <reference types="next" />
/// <reference types="next/types/global" />

declare module "*.png" {
  const content: string;
  export default content;
}
