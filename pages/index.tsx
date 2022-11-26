import styled from "styled-components";
import { Layout, Button, Form, Input, Space  } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
const { Header, Sider, Content } = Layout;

const Index = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 10px;
  bottom: 10px;
  .page {
    height: 100%;
  }
  .header {
    height: 15vh;
    background: #e7edec;
    padding-inline: 0;
    line-height: inherit;
  }
  .side {
    background: #252f3f;
    .message-box {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 0 20px;
    }
    .message-title {
      color: white;
      font-size: 25px;
    }
  }
  .message-form {
    width: 100%;
  }
  .remove-icon {
    color: #4096ff;
  }
  .btn-submit {
    width: 100%;
    height: 60px;
  }
  .ue-connect {
    display: flex;
  }
`

export default function IndexPage() {
  const onFinish = (values: any) => {
    console.log('Received values of form:', values);
  };
  return (
    <Index>
      <Layout className="page">
        <Sider className="side" width={450}>
          <div className="message-box">
            <h1 className="message-title">PixelStreaming Test</h1>
            <Form className="message-form" onFinish={onFinish} autoComplete="off">
              <Form.List name="users">
                {(fields, { add, remove }) => (
                  <>
                    {fields.map(({ key, name, ...restField }) => (
                      <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                        <Form.Item
                          {...restField}
                          name={[name, 'first']}
                          rules={[{ required: true, message: 'Missing first name' }]}
                        >
                          <Input placeholder="Field" />
                        </Form.Item>
                        <Form.Item
                          {...restField}
                          name={[name, 'last']}
                          rules={[{ required: true, message: 'Missing last name' }]}
                        >
                          <Input placeholder="Value" />
                        </Form.Item>
                        <MinusCircleOutlined className="remove-icon" onClick={() => remove(name)} />
                      </Space>
                    ))}
                    <Form.Item>
                      <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                        Add Field
                      </Button>
                    </Form.Item>
                  </>
                )}
              </Form.List>
              <Form.Item>
                <Button className="btn-submit" type="primary" htmlType="submit">
                  发送消息
                </Button>
              </Form.Item>
            </Form>
          </div>
        </Sider>
        <Layout>
          <Header className="header">
            <div className="ue-connect">
              <p style={{ width: 'auto'}}>连接UE推流: </p>
              <Input placeholder="Field" />
            </div>
          </Header>
          <Content className="content">Content</Content>
        </Layout>
      </Layout>
    </Index>
  )
}