import React from 'react'
import Header from '../components/Header';
import { UserData, DataColumns } from './UserData';
import PageCard from '../components/UI/PageCard';
import { Table } from 'antd';
const Users = () => {
  return (
    <PageCard>
      <Header title = "Users"/>
      <Table
        columns={DataColumns}
        dataSource={UserData}
      ></Table>
    </PageCard>
  )
}

export default Users
