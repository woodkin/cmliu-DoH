# DNS-over-HTTPS (DoH) 代理

该项目提供一个简单的 DNS-over-HTTPS (DoH) 代理，作为 Cloudflare Worker 实现。该代理允许您通过 HTTPS 进行 DNS 查询，增加了 DNS 请求的安全性和隐私性。

## 特性

- **支持 GET 和 POST：** 代理支持 GET 和 POST 方法进行 DNS 查询。GET 请求将 DNS 查询作为参数包含在 URL 中，而 POST 请求使用请求体。

- **JSON 支持：** 对于包含 'Accept: application/dns-json' 头部的 GET 请求，支持 JSON 格式。这允许与提供 JSON 格式响应的 DoH 服务兼容。

## 使用方法

1. **部署 Worker：** 将 `_worker.js` 的内容复制并粘贴到 Cloudflare Workers 仪表板中，部署 Cloudflare Worker。

2. **访问代理：**
   - 对于 GET 请求：通过在 Worker URL 中包含 'dns' 查询参数进行 GET 请求。示例：`https://your-worker-url/?dns=example.com`
   - 对于 POST 请求：通过将 DNS 查询包含在请求体中，向 Worker URL 发送 POST 请求。

3. **JSON 格式（可选）：** 如果您喜欢 JSON 格式，可以在 GET 请求中包含 'Accept: application/dns-json' 头部。

## 示例

### GET 请求：
```bash
curl "https://your-worker-url/?dns=example.com"
```

### POST 请求：
```bash
curl -X POST "https://your-worker-url/" --data-binary "@dns-query.bin" -H "Content-Type: application/dns-message"
```

### JSON 请求：
```bash
curl "https://your-worker-url/?dns=example.com" -H "Accept: application/dns-json"
```

## 配置
调整代码中的常量，如 DoH 服务的 URL（doh 和 dohjson），以匹配您喜好的 DoH 服务。

```javascript
const doh = 'https://dns.google/dns-query';
const dohjson = 'https://dns.google/resolve';
```

## 感谢
[tina-hello](https://github.com/tina-hello/doh-cf-workers)


## 许可证
该项目根据 0BSD 许可证授权。有关详细信息，请参阅 LICENSE 文件。
