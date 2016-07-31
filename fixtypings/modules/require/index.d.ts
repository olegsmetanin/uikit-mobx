interface NodeRequire {
  ensure: (paths: string[], callback: (require: (path: string) => any) => void, name?:string ) => void;
}