import Deploy from '../index';

describe('http-async', function () {
  test('constructor', function () {
    const deploy = new Deploy(__dirname + '/flows/http-async.flow.ts');

    expect(deploy.file).toEqual(__dirname + '/flows/http-async.flow.ts');
    expect(deploy.name).toEqual('http-async');
  });

  test('build', async function () {
    const deploy = new Deploy(__dirname + '/flows/http-async.flow.ts');
    const info = deploy.build();

    expect(info.functions).toHaveLength(2);
    expect(info.triggers).toHaveLength(1);
  });

  test('deploy', async function () {
    const deploy = new Deploy(__dirname + '/flows/http-async.flow.ts');
    const info = deploy.build();
    const res = await deploy.deploy(info);

    expect(res).toBeTruthy();
  }, 30000);
});
