export default function convertDate(date) {
  const month = [
    'Januari',
    'Februari',
    'Maret',
    'April',
    'Mei',
    'Juni',
    'Juli',
    'Agustus',
    'September',
    'Oktober',
    'November',
    'Desember',
  ];
  return (
    date.split('-')[2] +
    ` ${month[date.split('-')[1] - 1]} ` +
    date.split('-')[0]
  );
}
