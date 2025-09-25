import { createSVG } from './svg_utils';

export default class Arrow {
    constructor(gantt, from_task, to_task, type) {
        //console.log(type)
        this.gantt = gantt;
        this.from_task = from_task;
        this.to_task = to_task;
        this.type = type;
        // types: AA, AE, EA, EE

        switch (type) {
            case "AA":
                this.calculate_path_type_ss();
                break;
            case "EE":
                this.calculate_path_type_ff();
                break;
            case "AE":
                this.calculate_path_type_sf();
                break;
            case "EA":
                this.calculate_path_type_fs();
                break;
        }

        //this.calculate_path();
        this.draw();
    }

    calculate_path_type_ss() {
        let data = this.get_start_end();
        const left = data.start_x - 2*this.gantt.options.padding;
        var offset = 1;
        if (data.start_y > data.end_y) {
            offset *= -1;
        }
        this.path = `
                M ${data.start_x} ${data.start_y + offset*6}
                H ${left}
                V ${data.end_y - offset*4}
                H ${data.end_x}
                m -5 -5
                l 5 5
                l -5 5`;
    }

    calculate_path_type_fs() {
        let data = this.get_start_end();
        //console.log('[START X, START Y, END X, END Y] ', this.get_start_end())
        const from_is_below_to = this.from_task.task._index > this.to_task.task._index;

        const right = data.start_x + 2*this.gantt.options.padding;
        const down1 = from_is_below_to ? this.gantt.options.bar_height / 2 - 2 * this.gantt.options.padding : - this.gantt.options.bar_height / 2 + 2* this.gantt.options.padding

        var offset = 1;
        if (data.start_y > data.end_y) {
            offset *= -1;
        }

        if (data.start_x < data.end_x) {
            this.path = `
                M ${data.start_x} ${data.start_y + offset*6}
                H ${right}
                V ${data.end_y - offset*4}
                H ${data.end_x}
                m -5 -5
                l 5 5
                l -5 5`;
        } else {
            this.path = `
                M ${data.start_x} ${data.start_y + offset*6}
                H ${right}
                v ${down1}
                H ${data.end_x - 2* this.gantt.options.padding}
                V ${data.end_y - offset*4}
                H ${data.end_x}
                m -5 -5
                l 5 5
                l -5 5`;
        }

    }
    calculate_path_type_ff() {
        let data = this.get_start_end();
        const right = data.start_x + 2*this.gantt.options.padding;
        var offset = 1;
        if (data.start_y > data.end_y) {
            offset *= -1;
        }

        this.path = `
                M ${data.start_x} ${data.start_y + offset*6}
                H ${right}
                V ${data.end_y - offset*4}
                H ${data.end_x}
                m 5 -5
                l -5 5
                l 5 5`;

    }
    calculate_path_type_sf() {
        let data = this.get_start_end();
        const from_is_below_to = this.from_task.task._index > this.to_task.task._index;

        const left = data.start_x - 2*this.gantt.options.padding;
        const down1 = from_is_below_to ? this.gantt.options.bar_height / 2 - 2 * this.gantt.options.padding : -this.gantt.options.bar_height / 2 + 2* this.gantt.options.padding

         var offset = 1;
        if (data.start_y > data.end_y) {
            offset *= -1;
        }

        if (data.start_x >= data.end_x) {
            this.path = `
                M ${data.start_x} ${data.start_y + offset*5}
                H ${left}
                V ${data.end_y - offset*5}
                H ${data.end_x}
                m 5 -5
                l -5 5
                l 5 5`;
        } else {
            this.path = `
                M ${data.start_x} ${data.start_y + offset*5}
                H ${left}
                v ${down1}
                H ${data.end_x + 2* this.gantt.options.padding}
                V ${data.end_y - offset*5}
                H ${data.end_x}
                m 5 -5
                l -5 5
                l 5 5`;
        }

    }

    get_start_end() {
        let start_x;
        let start_y;
        let end_x;
        let end_y;

        if (this.type == "AA" || this.type == "AE") {
            start_x = this.from_task.$bar.getX();
        } else {
            start_x = this.from_task.$bar.getX() + this.from_task.$bar.getWidth() - 3;
        }

        if (this.type == "AA" || this.type == "EA") {
            end_x = this.to_task.$bar.getX() - 3;
        } else {
            end_x = this.to_task.$bar.getX() + this.to_task.$bar.getWidth() + 3;
        }
        
        start_y =
            this.gantt.config.header_height +
            this.gantt.options.bar_height +
            (this.gantt.options.padding + this.gantt.options.bar_height) *
                this.from_task.task._index +
            this.gantt.options.padding / 2 - this.gantt.options.bar_height/2;

        end_y =
            this.gantt.config.header_height +
            this.gantt.options.bar_height / 2 +
            (this.gantt.options.padding + this.gantt.options.bar_height) *
                this.to_task.task._index +
            this.gantt.options.padding / 2;

        //console.log(start_x, start_y, end_x, end_y)
        
        return {start_x: start_x, start_y: start_y, end_x: end_x, end_y: end_y};
    }

    draw() {
        this.element = createSVG('path', {
            d: this.path,
            'data-from': this.from_task.task.id,
            'data-to': this.to_task.task.id,
        });
    }

    update() {
        this.calculate_path();
        this.element.setAttribute('d', this.path);
    }
}
