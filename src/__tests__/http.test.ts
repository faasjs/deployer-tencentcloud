import Deploy from '../index';

describe('http', function () {
  test('constructor', function () {
    const deploy = new Deploy(__dirname + '/flows/http.flow.ts');

    expect(deploy.file).toEqual(__dirname + '/flows/http.flow.ts');
    expect(deploy.name).toEqual('http');
  });

  test('build', async function () {
    const deploy = new Deploy(__dirname + '/flows/http.flow.ts');
    const info = deploy.build();

    const handler = require(info.functions[0].tmpFolder + '/index.js').handler;
    const res = await handler(0, {});

    expect(info.functions).toHaveLength(1);
    expect(info.triggers).toHaveLength(1);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual('{"data":1}');
  });

  test('deploy', async function () {
    const deploy = new Deploy(__dirname + '/flows/http.flow.ts');
    const info = deploy.build();
    const res = await deploy.deploy(info);

    expect(res).toBeTruthy();
  }, 30000);
});
