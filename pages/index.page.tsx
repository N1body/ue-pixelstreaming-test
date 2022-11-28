import styled from "styled-components";
import { Layout, Button, Form, Input, Space  } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import Player from './player.page'
import {
  load,
  ControlSchemeType,
  inputOptions,
  closeWs,
  addResponseEventListener,
  emitUIInteraction,
} from './epic-tool/app'
import { useState } from "react";
const { Header, Sider, Content } = Layout;

const Index = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 0px;
  bottom: 0px;
  .page {
    height: 100%;
  }
  .header {
    height: 15vh;
    background: #cbcbcb;
    padding-inline: 0;
    line-height: inherit;
    padding: 10px 20px;
  }
  .content {
    padding: 0 10px;
    display: flex;
    align-items: center;
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
    align-items: center;
    column-gap: 10px;
  }
  .ue-input {
    width: 200px;
    height: 35px;
    line-height: 35px;
  }
  .btn-connect {
    margin-right: 10px;
  }
  .ue-receive {
    display: flex;
    align-items: center;
    column-gap: 10px;
  }
`

export default function IndexPage() {
  const [receiveMessage, setReceiveMessage] = useState('123')
  const [connectUrl, setConnectUrl] = useState('')
  const connectUe = () => {
    load(`http://${connectUrl}`)
    inputOptions.controlScheme = ControlSchemeType.HoveringMouse
    inputOptions.fakeMouseWithTouches = true 
    addResponseEventListener('handle_responses', handleResponese)
  }
  const handleResponese = (data) => {
    console.log('接收到消息:', data);
    setReceiveMessage(data)
  }
  const connectClose = () => {
    load('http://0.0.0.0')
    closeWs()
  }
  const sendMessgae = (values: any) => {
    const descriptor = values.message.reduce((pre, item) => {
      return {...pre, [item.field]: item.value}
    }, {})
    console.log('descriptor:', descriptor);
    emitUIInteraction(descriptor)
  };
  return (
    <Index>
      <Layout className="page">
        <Sider className="side" width={450}>
          <div className="message-box">
            <h1 className="message-title">PixelStreaming Test</h1>
            <Form className="message-form" onFinish={sendMessgae} autoComplete="off">
              <Form.List name="message">
                {(fields, { add, remove }) => (
                  <>
                    {fields.map(({ key, name, ...restField }) => (
                      <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                        <Form.Item
                          {...restField}
                          name={[name, 'field']}
                          rules={[{ required: true, message: '缺少字段' }]}
                        >
                          <Input placeholder="Field" />
                        </Form.Item>
                        <Form.Item
                          {...restField}
                          name={[name, 'value']}
                          rules={[{ required: true, message: '缺少值' }]}
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
              <p className="ue-title">连接UE推流: </p>
              <Input className="ue-input" placeholder="UE地址" defaultValue={connectUrl} onChange={(value) => {
                setConnectUrl(value.target.value)
              }}/>
              <div className="ue-operation">
                <Button type="primary" className="btn-connect" onClick={connectUe}>连接</Button>
                <Button onClick={connectClose}>断开连接</Button>
              </div>
            </div>
            <div className="ue-receive">
              <p className="receive-title">UE消息监听:</p>
              <p className="receive-content">{receiveMessage}</p>
            </div>
          </Header>
          <Content className="content">
            <Player />
          </Content>
        </Layout>
      </Layout>
    </Index>
  )
}