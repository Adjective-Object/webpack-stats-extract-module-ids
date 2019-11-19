import { Stats as WebpackStats } from 'webpack';
import { getModuleIds } from '../getModuleIds';
import { readFile } from 'mz/fs';
import { join as joinPath } from 'path';

type RecursivePartial<T> = {
    [P in keyof T]?: RecursivePartial<T[P]>;
};

describe('getModuleIds', () => {
    it('replicates reason relationships as reasonChildren', () => {
        const testStats: RecursivePartial<WebpackStats.ToJsonOutput> = {
            modules: [
                {
                    name: 'lib/foo',
                    id: 'lib-foo-1'
                },
                {
                    name: 'lib/bar',
                    reasons: [
                        {
                            moduleName: 'lib/foo'
                        }
                    ],
                    id: 'lib-bar-2'
                },
                {
                    name: 'lib/baz',
                    reasons: [
                        {
                            moduleName: 'lib/bar'
                        }
                    ],
                    id: 'lib-baz-3'
                }
            ]
        };

        const outIdMap = getModuleIds(testStats as WebpackStats.ToJsonOutput);

        expect(outIdMap).toEqual({
            'lib-foo-1': {
                name: 'lib/foo'
            },
            'lib-bar-2': {
                name: 'lib/bar'
            },
            'lib-baz-3': {
                name: 'lib/baz'
            }
        });
    });

    it('matches the snapshot', async () => {
        const statsJsonString = await readFile(
            joinPath(__dirname, '/test-data', 'bonsai-stats.json'),
            'utf-8'
        );
        const stats = JSON.parse(statsJsonString);
        const resultGraph = getModuleIds(stats);

        expect(resultGraph).toMatchSnapshot();
    });
});
