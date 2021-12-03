// NOTE: 추후 오픈
// import Number from '@/components/Number';

// const getColorFromValue = (value: number | null) => {
//   if (value === null) return 'error';
//   if (value > 0) return 'error';
//   if (value < 0) return '#6384DB';
//   return 'gray';
// };

// const ChangeRanking: React.FC<{ value: number | null }> = ({ value }) => {
//   const color = getColorFromValue(value);

//   return value === null ? (
//     <Number color={color} fontSize="10px" fontWeight="bold">
//       NEW
//     </Number>
//   ) : (
//     <Number color={color} fontSize="12px">
//       {value > 0 && '▲ '}
//       {value < 0 && '▼ '}
//       {value ? Math.abs(value) : '-'}
//     </Number>
//   );
// };
export default function ChangeRanking({ value }: { value: number | null }) {
  return null;
}
