/* eslint-disable react/jsx-key */
import { Box, Th, Thead, Tr } from '@chakra-ui/react';
import { HeaderGroup } from 'react-table';

type Props<D extends object> = {
  headerGroups: HeaderGroup<D>[];
  fixHead: boolean;
  canSort: boolean;
  isShowStripe: boolean;
};

function Head<D extends object>({
  headerGroups,
  fixHead,
  canSort,
  isShowStripe,
}: Props<D>) {
  return (
    <Thead>
      {headerGroups.map((headerGroup) => {
        return (
          <Tr
            {...headerGroup.getHeaderGroupProps()}
            backgroundColor={isShowStripe ? 'gray.100' : 'transparent'}
          >
            {headerGroup.headers.map((column: HeaderGroup<D>) => {
              const headerProps = column.getHeaderProps(
                canSort ? column.getSortByToggleProps() : {}
              );

              return (
                <Th
                  display="flex"
                  alignItems="center"
                  height="34px"
                  padding="0 20px"
                  position={fixHead ? 'sticky' : 'static'}
                  color="grayAlternatives.400"
                  borderColor={
                    isShowStripe ? 'transparent' : 'grayAlternatives.50'
                  }
                  {...headerProps}
                >
                  {column.render('Header')}
                  {canSort && (
                    <Box>
                      {column.isSorted
                        ? column.isSortedDesc
                          ? ' 🔽'
                          : ' 🔼'
                        : ''}
                    </Box>
                  )}
                </Th>
              );
            })}
          </Tr>
        );
      })}
    </Thead>
  );
}

export default Head;
