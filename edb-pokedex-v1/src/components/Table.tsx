import { SerializedPokemon } from '@/types';
import { fadeInUp } from '@/utils/animations';
import { motion } from 'framer-motion';
import Link from 'next/link';
import React, { useMemo } from 'react';
import { useTable, useSortBy, Column } from 'react-table';

type Props = {
  data: SerializedPokemon[];
};

const columns: Array<Column<SerializedPokemon>> = [
  {
    Header: '  ',
    accessor: (data: any) => (
      <Link key={data.id} href={`/pokemon/${data.name}`} data-testid={`data-${data.id}`}>
        <motion.div variants={fadeInUp} whileHover={{ scale: 1.03 }} whileTap={{ scale: 1 }}>
          <div data-testid={`data-${data.id}-name`} className="text-l font-bold ml-10">
            {data.name}
          </div>
        </motion.div>
      </Link>
    ),
  },
  {
    Header: ' ',
    accessor: (data: any) => (
      <img
        src={data.image}
        alt={data.name}
        width="35"
        className="ml-0 rounded-lg border-slate-300 border p-1 bg-white h-9 drop-shadow-2xl"
      />
    ),
  },
  {
    Header: 'HP',
    accessor: (data: any) => data.stats['HP'],
  },
  {
    Header: 'Attack',
    accessor: (data: any) => data.stats['Attack'],
  },
  {
    Header: 'Defense',
    accessor: (data: any) => data.stats['Defense'],
  },
  {
    Header: 'Sp. Attack',
    accessor: (data: any) => data.stats['Sp. Attack'],
  },
  {
    Header: 'Sp. Defense',
    accessor: (data: any) => data.stats['Sp. Defense'],
  },
  {
    Header: 'Speed',
    accessor: (data: any) => data.stats['Speed'],
  },
];

const Table = (props: Props) => {
  const data = useMemo(() => props.data, [props.data]);
  const { getTableBodyProps, headerGroups, rows, prepareRow } = useTable(
    {
      columns,
      data,
    },
    useSortBy,
  );

  return (
    <div>
      <table className="w-full">
        <thead className="text-left">
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()} key={headerGroup.id}>
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  key={column.id}
                  scope="col"
                >
                  {column.render('Header')}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()} key={row.id}>
                {row.cells.map((cell) => {
                  return <td {...cell.getCellProps()}>{cell.render('Cell')} </td>;
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
