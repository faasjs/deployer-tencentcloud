import Deploy from '../index';

describe('multi', function () {
  test('constructor', function () {
    const deploy = new Deploy(__dirname + '/flows/multi.flow.ts');

    expect(deploy.file).toEqual(__dirname + '/flows/multi.flow.ts');
    expect(deploy.name).toEqual('multi');
  });

  test('build', async function () {
    const deploy = new Deploy(__dirname + '/flows/multi.flow.ts');
    const info = deploy.build();

    expect(info.functions).toHaveLength(2);
  });

  test('deploy', async function () {
    const deploy = new Deploy(__dirname + '/flows/multi.flow.ts');
    const info = deploy.build();
    const res = await deploy.deploy(info);

    expect(res).toBeTruthy();
  }, 10000);
});
