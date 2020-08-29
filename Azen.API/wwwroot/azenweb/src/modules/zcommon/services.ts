import { Constants as ZPantexConstants } from "../zpantex";

namespace Services {
        
    export class MapServices<TKey, TValue>
    {
        public getMapIndexByKey(map: Map<TKey, TValue>, key: TKey) {

            if (!map) {
                return -1;
            }

            if (!map.has(key)) {
                return -1;
            }

            let keyI: TKey;
            let keysIterable: IterableIterator<TKey> = map.keys();
            for (let i = 0; i < map.size; i++) {
                keyI = keysIterable.next().value;
                if (key == keyI) {
                    return i;
                }
            }

            return -1;
        }

        public getElementByIndex(map: Map<TKey, TValue>, index: number): TValue {
            if (!map) {
                return null;
            }

            if (index < 0) {
                return null;
            }

            if (index >= map.size) {
                return null;
            }

            let valueI: TValue;
            let valuesIterable: IterableIterator<TValue> = map.values();
            for (let i = 0; i < map.size; i++) {
                valueI = valuesIterable.next().value;
                if (i == index) {
                    return valueI;
                }
            }

            return null;
        }

        addNewElementAtBeginingImmutableWay(key: TKey, value: TValue, sourceMap: Map<TKey, TValue>): Map<TKey, TValue> {

            let resultMap = new Map<TKey, TValue>();

            if (!sourceMap) {
                return resultMap;
            }

            resultMap.set(key, value);

            sourceMap.forEach((sourceValue: TValue, sourceKey: TKey) => {
                resultMap.set(sourceKey, Object.assign({}, sourceValue));
            });

            return resultMap;
        }

        updateAndPutFirstElementImmutableWay(key: TKey, updateAllMapValuesFn: () => Map<TKey, TValue>, updateValueFn: () => TValue): Map<TKey, TValue> {

            let resultMap = new Map<TKey, TValue>();

            if (updateAllMapValuesFn && typeof updateAllMapValuesFn == "function") {

                let updatedMap = updateAllMapValuesFn();
                resultMap.set(key, Object.assign({}, updateValueFn()));
                updatedMap.forEach((valueI: TValue, keyI: TKey) => {
                    if (keyI == key) {
                        return true;
                    }
                    resultMap.set(keyI, valueI);
                });
                if (!resultMap || !resultMap.has(key)) {
                    return new Map<TKey, TValue>();
                }
            }

            return resultMap;
        }
    }

    export class ZCommonServices {

        private zPantexId: string;
        private zPantexTitleId: string;
        private zRegionId: string;
        private zFormaTablaId: string;

        constructor() {
            this.zPantexId = "";
            this.zPantexTitleId = "";
            this.zRegionId = "string";
            this.zFormaTablaId = "";
        }

        public getZPantexId(px: number, isQuerySelector: boolean) {
            this.zPantexId = `${ZPantexConstants.PX_PREFIJO_ID}${px}`
            return (isQuerySelector ? '#' + this.zPantexId : this.zPantexId);
        }

        public getZPantexTitleId(px: number, isQuerySelector: boolean) {
            this.zPantexTitleId = `${ZPantexConstants.PX_PREFIJO_TITLE_ID}${px}`
            return (isQuerySelector ? '#' + this.zPantexTitleId : this.zPantexTitleId);
        }

        public getZRegionId(px: number, zRegId: number, isQuerySelector: boolean) {
            this.zRegionId = `${ZPantexConstants.PX_PREFIJO_ID}${px}${ZPantexConstants.REG_PREFIJO_ID}${zRegId}`
            return (isQuerySelector ? '#' + this.zRegionId : this.zRegionId);
        }

        public getZFormaTablaId(px: number, zftId: number, isQuerySelector: boolean) {
            this.zFormaTablaId = `${ZPantexConstants.PX_PREFIJO_ID}${px}${ZPantexConstants.ZFT_PREFIJO_ID}${zftId}`
            return (isQuerySelector ? '#' + this.zFormaTablaId : this.zFormaTablaId);
        }
    }

}

export {
    Services
}