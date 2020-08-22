type RecordItem = {
  tags: string[];
  notes: string;
  type: string;
  amount: number;
  createdAt?: Date;
  push?(record2: RecordItem): void;
}
type Tag = {
  id: string;
  name: string;
}

type DataSourceItem={text: string;value: string};