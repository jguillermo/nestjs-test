export interface StringProcess {
  get regexp();
  process(data: string): any;
}
