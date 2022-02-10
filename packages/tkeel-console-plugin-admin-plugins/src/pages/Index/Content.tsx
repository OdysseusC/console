import { useState } from 'react';
import { Flex, Text } from '@chakra-ui/react';
import { SearchInput } from '@tkeel/console-components';
import { usePagination } from '@tkeel/console-hooks';

import PluginList from './PluginList';

import useInstalledPluginsQuery from '@/tkeel-console-plugin-admin-plugins/hooks/queries/useInstalledPluginsQuery';
import useRepoInstallersQuery from '@/tkeel-console-plugin-admin-plugins/hooks/queries/useRepoInstallersQuery';

type Props = {
  isInstalledPlugins?: boolean;
  repo?: string;
};

function Content({ isInstalledPlugins = false, repo }: Props) {
  const [keywords, setKeywords] = useState('');
  const { pageNum, pageSize, setTotalSize, ...rest } = usePagination({});

  const { plugins: repoPlugins, data } = useRepoInstallersQuery({
    repo: repo as string,
    keywords,
    pageNum,
    pageSize,
    enabled: !isInstalledPlugins,
    onSuccess: (result) => {
      // eslint-disable-next-line no-console
      console.log('Content ~ result', result);
      setTotalSize(1);
    },
  });

  const { plugins: repoInstalledPlugins } = useInstalledPluginsQuery({
    enabled: isInstalledPlugins,
  });

  const plugins = isInstalledPlugins ? repoInstalledPlugins : repoPlugins;
  const totalNum = data?.total || 0;
  const installedNum = data?.installed_num || 0;
  let pluginNum = [
    {
      name: '插件数量',
      num: totalNum,
    },
    {
      name: '已安装',
      num: installedNum,
    },
    {
      name: '未安装',
      num: totalNum - installedNum,
    },
  ];
  if (isInstalledPlugins) {
    pluginNum = [pluginNum[1]];
  }

  return (
    <Flex
      flexDirection="column"
      height="100%"
      paddingTop="17px"
      borderRadius="4px"
      backgroundColor="white"
    >
      <Flex margin="0 24px" alignItems="center" justifyContent="space-between">
        <Flex alignItems="center">
          {pluginNum.map((item) => (
            <Flex key={item.name} alignItems="center" marginRight="5px">
              <Text color="gray.700" fontSize="12px" fontWeight="500">
                {item.name}
              </Text>
              <Text
                marginLeft="2px"
                color="gray.500"
                fontSize="12px"
                fontWeight="500"
              >
                {item.num}
              </Text>
            </Flex>
          ))}
        </Flex>
        <SearchInput
          width="452px"
          placeholder="搜索插件"
          onSearch={(value) => {
            setKeywords(value);
          }}
        />
      </Flex>
      <PluginList
        plugins={plugins}
        pageNum={pageNum}
        pageSize={pageSize}
        setTotalSize={setTotalSize}
        {...rest}
      />
    </Flex>
  );
}

export default Content;
