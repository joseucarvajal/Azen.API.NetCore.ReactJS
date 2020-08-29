import {
    EntityNormalizedObj,
    IdEntityBase,
    EntityMap,
    IZEvento,
    Constants
} from "../zcommon";

const u = require('updeep');
let xml2js = require('xml2js');

export namespace Services {
    export const getQueryStringParameter = (name: string, url?: string) => {

        if (!url) {
            url = window.location.href;
        }

        name = name.replace(/[\[\]]/g, "\\$&");
        let regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)");
        let results = regex.exec(url);

        if (!results) {
            return null;
        }
        if (!results[2]) {
            return '';
        }

        return decodeURIComponent(results[2].replace(/\+/g, " "));
    }

    export const getArrayFromMap = <TEntity>(entityNormalizeObj: EntityNormalizedObj<TEntity>, cloneObjects = false) => {

        let dataSourceRequestsList = new Array<TEntity>();

        if (!entityNormalizeObj) {
            return dataSourceRequestsList;
        }

        if (!entityNormalizeObj.allIds) {
            return dataSourceRequestsList;
        }

        for (let i = 0; i < entityNormalizeObj.allIds.length; i++) {

            if (cloneObjects) {
                dataSourceRequestsList.push(Object.assign({}, entityNormalizeObj.byId[entityNormalizeObj.allIds[i]]));
                continue;
            }

            dataSourceRequestsList.push(entityNormalizeObj.byId[entityNormalizeObj.allIds[i]]);
        }

        return dataSourceRequestsList;
    }

    export const storeById = <TEntity extends IdEntityBase>(previousEntityMap: EntityMap<TEntity>, newEntityMap: TEntity): EntityMap<TEntity> => {

        let newEntityMapState = new EntityMap<TEntity>();

        const { id } = newEntityMap;

        newEntityMapState = u({
            [id]: newEntityMap
        }, previousEntityMap);

        return newEntityMapState;
    }

    export const removeById = <TEntity extends IdEntityBase>(previousEntityMap: EntityMap<TEntity>, id: number): EntityMap<TEntity> => {

        return u(u.omit(id), previousEntityMap);
    }

    export const storeByAllIds = (previousIdsList: Array<number>, idEntityBase: IdEntityBase): Array<number> => {

        if (previousIdsList.indexOf(idEntityBase.id) == -1) {
            return [...previousIdsList, idEntityBase.id];
        }

        return previousIdsList;
    }

    export const removeByAllIds = (previousIdsList: Array<number>, id: number): Array<number> => {
        return u(u.reject((entityId: number) => entityId == id), previousIdsList);
    }

    export namespace Inmutable {
        export const intercambiarElementosArray = (previousIdsList: Array<number>, firstId: number, secondId: number): Array<number> => {

            let firstIndex = previousIdsList.indexOf(firstId);
            let secondIndex = previousIdsList.indexOf(secondId);

            const newIdsList = previousIdsList.slice();
            const firstItem = previousIdsList[firstIndex];
            newIdsList[firstIndex] = previousIdsList[secondIndex];
            newIdsList[secondIndex] = firstItem;

            return newIdsList;
        }
    }

        /**
         * @param zEvento evento azen
         * https://www.npmjs.com/package/xml2js#processing-attribute-tag-names-and-values
         */
        export const parseEventoDataToJSON = (zEvento: IZEvento) => {
            if (zEvento.dato.buffer.fto == Constants.FormatoDatoEventoEnum.XML) {

                let eventDataResult = (`<r>${zEvento.dato.buffer.dato}</r>`);

                let parsingOptions = {
                    trim: true, //Trim the whitespace at the beginning and end of text nodes.
                    normalizeTags: true, //Normalize all tag names to lowercase.
                    normalize: false, //Trim whitespaces inside text nodes.
                    explicitArray: false //Always put child nodes in an array if true; otherwise an array is created only if there is more than one
                }

                xml2js.parseString(eventDataResult, parsingOptions, (err: any, result: any) => {
                    zEvento.dato.buffer.dato = result.r;
                });
            }
    }

    export const trimLasCharacter = (s: string, c: string) => {
        if (c === "]") c = "\\]";
        if (c === "\\") c = "\\\\";
        return s.replace(new RegExp("^[" + c + "]+|[" + c + "]+$", "g"), "");
    };
}