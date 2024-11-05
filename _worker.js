// SPDX-License-Identifier: 0BSD

// 定义常量，指定 DNS-over-HTTPS (DoH) 服务的 URL
const doh = 'https://dns.google/dns-query';
const dohjson = 'https://dns.google/resolve';

// 定义常量，指定请求和响应的内容类型
const contype = 'application/dns-message';
const jstontype = 'application/dns-json';

// 创建一个表示 404 Not Found 响应的对象
const r404 = new Response(null, { status: 404 });

// 导出 Worker 模块的默认函数
export default {
    async fetch(r, env, ctx) {
        // 处理请求并返回响应
        return handleRequest(r);
    },
};

// 处理传入的请求
async function handleRequest(request) {
    // 初始化响应对象，开始时默认为 404 Not Found
    let res = r404;

    // 从请求中获取方法、头部和 URL 等信息
    const { method, headers, url } = request;

    // 从 URL 中提取查询参数
    const searchParams = new URL(url).searchParams;

    // 如果请求方法为 GET 并且包含 'dns' 查询参数
    if (method == 'GET' && searchParams.has('dns')) {
        // 发起 GET 请求到 DoH 服务，携带 'dns' 查询参数
        res = fetch(doh + '?dns=' + searchParams.get('dns'), {
            method: 'GET',
            headers: {
                'Accept': contype,
            },
        });
    } else if (method === 'POST' && headers.get('content-type') === contype) {
        // 如果请求方法为 POST 并且内容类型为 'application/dns-message'
        // 从请求流中获取请求体，并发起 POST 请求到 DoH 服务
        const rostream = request.body;
        res = fetch(doh, {
            method: 'POST',
            headers: {
                'Accept': contype,
                'Content-Type': contype,
            },
            body: rostream,
        });
    } else if (method === 'GET' && headers.get('Accept') === jstontype) {
        // 如果请求方法为 GET 并且包含 'Accept: application/dns-json' 头部
        // 发起 GET 请求到支持 JSON 格式的 DoH 服务
        const search = new URL(url).search;
        res = fetch(dohjson + search, {
            method: 'GET',
            headers: {
                'Accept': jstontype,
            },
        });
    }

    // 返回最终的响应对象
    return res;
}
