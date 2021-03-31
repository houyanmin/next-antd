
import React from 'react'
import { GetStaticProps } from 'next'
import Link from 'next/link'
import {
  Form,
  Select,
  InputNumber,
  DatePicker,
  Switch,
  Slider,
  Button,
} from 'antd'
import '../Home.module.less'


const FormItem = Form.Item
const Option = Select.Option

const Index: React.FC<any> = (props) => {
  const { className, ...rest } = props
  return (
    <div className="container">
      <Form layout="horizontal" style={{ width: '100%' }}>
        <FormItem
          label="Input Number"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 8 }}
        >
          <InputNumber
            size="large"
            min={1}
            max={10}
            style={{ width: 100 }}
            defaultValue={3}
            name="inputNumber"
          />
          <Link href="/login"><a>Link</a></Link>
        </FormItem>

        <FormItem
          label="Switch"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 8 }}
        >
          <Switch defaultChecked />
        </FormItem>

        <FormItem
          label="Slider"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 8 }}
        >
          <Slider defaultValue={70} />
        </FormItem>

        <FormItem
          label="Select"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 8 }}
        >
          <Select size="large" defaultValue="lucy" style={{ width: 192 }}>
            <Option value="jack">jack</Option>
            <Option value="lucy">lucy</Option>
            <Option value="disabled" disabled>
              disabled
            </Option>
            <Option value="yiminghe">yiminghe</Option>
          </Select>
        </FormItem>

        <FormItem
          label="DatePicker"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 8 }}
        >
          <DatePicker name="startDate" />
        </FormItem>
        <FormItem style={{ marginTop: 48 }} wrapperCol={{ span: 8, offset: 8 }}>
          <Button size="large" type="primary" htmlType="submit">
            OK
          </Button>
          <Button
            size="large"
            style={{ marginLeft: 8 }}
            onClick={() => {
              window.alert('With typescript and Jest')
            }}
          >
            Cancel
          </Button>
        </FormItem>
      </Form>
      <Link href="/user">
        <a>user</a>
      </Link>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  return { props: {} }
}

export default Index