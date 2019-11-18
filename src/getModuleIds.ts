import { Stats as WebpackStats } from 'webpack';

export interface AbbreviatedModule {
    name: string;
}

export type ModuleIdMap = {
    [id: string]: AbbreviatedModule;
};

/**
 * Builds a copy of a module graph tracking child information & with a unique ID associated
 * with each node in the graph.
 *
 * @param graph
 */
export function getModuleIds(stats: WebpackStats.ToJsonOutput): ModuleIdMap {
    if (!stats.modules) {
        throw new Error('no modules in provided webpack stats object');
    }

    const moduleMap: ModuleIdMap = {};
    for (let module of stats.modules) {
        moduleMap[module.id] = {
            name: module.name
        };
    }

    return moduleMap;
}
