import { Spacecraft } from '@/entities/spacecraft/models';

export default function formatData(data: Spacecraft[]): string {
  const tableHead = ['Uid', 'Spacecraft', 'Status', 'Date'];
  let content = `${tableHead.join(',')}\n`;
  const tableRows = data.map((item) => {
    return [item.uid, item.name, item.status, item.dateStatus];
  });
  tableRows.forEach((row) => {
    content += `${row.join(',')}\n`;
  });
  return content;
}
