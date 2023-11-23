import { asyncEach } from '@helpers/functions/async-each-fn';
import { SearchSelectOptionsInterface } from '@common/form/select/search-select/models/search-select-options.interface';
import { includes } from 'lodash-es';


export const asyncSearch = (array: Array<SearchSelectOptionsInterface>, value: any,
                            options: {
                                cb: (v: Array<SearchSelectOptionsInterface>) => void,
                                breakCb: ((v: any) => any)
                            }) => {
    const result: Array<SearchSelectOptionsInterface> = [];
    asyncEach(array, (item, index) => {
        if (includes(item.label, value)) {
            result.push(item);
        }
    }, {
        finallyCb: () => options.cb(result),
        breakCb: options.breakCb
    });
};
