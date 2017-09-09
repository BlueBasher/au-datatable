import { autoinject, bindable, customAttribute, bindingMode, BindingEngine } from 'aurelia-framework';
import { IAuTableParameters } from './au-table-contracts/IAuTableParameters';

@customAttribute('au-table')
export class AuTableCustomAttribute {

    @bindable({
        changeHandler: 'set_data'
    })
    public starting_data: Array<any>;
    @bindable({
        defaultBindingMode: bindingMode.twoWay,
        changeHandler: 'update_current_page'
    })
    public parameters: IAuTableParameters;

    constructor(
        private element: Element,
        private binding_engine: BindingEngine
    ) { }

    private set_data(): void {
        if (this.starting_data.length > this.parameters.page_size) throw new Error('[au-table:bind] starting data is larger than page size.');
        this.parameters.table_data = [].concat(this.starting_data);
        this.parameters.current_page = 1;
        this.parameters.skip = 0;
    }

    private update_current_page(): void {
        this.parameters.current_page = this.parameters.total_records > 0 ? 1 : 0;
    }
}	