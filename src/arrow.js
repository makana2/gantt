import { createSVG, $ } from './svg_utils';

export default class Arrow {
    constructor(gantt, from_task, to_task, type) {
        //console.log(type)
        this.gantt = gantt;
        this.from_task = from_task;
        this.to_task = to_task;
        this.type = type;
        // types: AA, AE, EA, EE

        this.calculate_path();
        this.draw();
    }

    calculate_path_type_ss() {
        let data = this.get_start_end();
        console.log(data)
        const left = data.start_x - 0.5 * this.gantt.options.padding;
        const to_is_below = data.end_y > data.start_y;
        const to_is_after = data.end_x >= data.start_x;
        const to_is_below_factor = to_is_below ? 1 : -1;

        if (to_is_after) {
            this.path = `
                M ${data.start_x} ${data.start_y + to_is_below_factor * 5}
                H ${left}
                V ${data.end_y - to_is_below_factor * (1.5 * this.gantt.options.padding)}
                H ${data.end_x + 0.5 * this.gantt.options.padding}
                V ${data.end_y - to_is_below_factor * (this.gantt.options.bar_height / 2 + 2)}
                m ${to_is_below_factor * (-5)}  ${to_is_below_factor * (-5)}
                l ${to_is_below_factor * (5)}  ${to_is_below_factor * (5)}
                l ${to_is_below_factor * (5)}  ${to_is_below_factor * (-5)}`;
        } else {
            this.path = `
                M ${data.start_x} ${data.start_y + to_is_below_factor * 5}
                H ${data.end_x + 0.5 * this.gantt.options.padding}
                V ${data.end_y - to_is_below_factor * (this.gantt.options.bar_height / 2 + 2)}
                m ${to_is_below_factor * (-5)}  ${to_is_below_factor * (-5)}
                l ${to_is_below_factor * (5)}  ${to_is_below_factor * (5)}
                l ${to_is_below_factor * (5)}  ${to_is_below_factor * (-5)}`;
        }
    }

    calculate_path_type_fs() {
        let data = this.get_start_end();
        const right = data.start_x + 0.5 * this.gantt.options.padding;
        const to_is_below = data.end_y > data.start_y;
        const to_is_after = data.end_x >= data.start_x;
        const to_is_below_factor = to_is_below ? 1 : -1;

        if (!to_is_after) {
            this.path = `
                M ${data.start_x} ${data.start_y + to_is_below_factor * 5}
                H ${right}
                V ${data.end_y - to_is_below_factor * (1.5 * this.gantt.options.padding)}
                H ${data.end_x + 0.5 * this.gantt.options.padding}
                V ${data.end_y - to_is_below_factor * (this.gantt.options.bar_height / 2 + 2)}
                m ${to_is_below_factor * (-5)}  ${to_is_below_factor * (-5)}
                l ${to_is_below_factor * (5)}  ${to_is_below_factor * (5)}
                l ${to_is_below_factor * (5)}  ${to_is_below_factor * (-5)}`;
        } else {
            this.path = `
                M ${data.start_x} ${data.start_y + to_is_below_factor * 5}
                H ${data.end_x + 0.5 * this.gantt.options.padding}
                V ${data.end_y - to_is_below_factor * (this.gantt.options.bar_height / 2 + 2)}
                m ${to_is_below_factor * (-5)}  ${to_is_below_factor * (-5)}
                l ${to_is_below_factor * (5)}  ${to_is_below_factor * (5)}
                l ${to_is_below_factor * (5)}  ${to_is_below_factor * (-5)}`;
        }
    }

    calculate_path_type_ff() {
        let data = this.get_start_end();
        console.log(data)
        const right = data.start_x + 0.5 * this.gantt.options.padding;
        const to_is_below = data.end_y > data.start_y;
        const to_is_after = data.end_x > data.start_x;
        const to_is_below_factor = to_is_below ? 1 : -1;

        if (!to_is_after) {
            this.path = `
                M ${data.start_x} ${data.start_y + to_is_below_factor * 5}
                H ${right}
                V ${data.end_y - to_is_below_factor * (1.5 * this.gantt.options.padding)}
                H ${data.end_x - 0.5 * this.gantt.options.padding}
                V ${data.end_y - to_is_below_factor * (this.gantt.options.bar_height / 2 + 2)}
                m ${to_is_below_factor * (-5)}  ${to_is_below_factor * (-5)}
                l ${to_is_below_factor * (5)}  ${to_is_below_factor * (5)}
                l ${to_is_below_factor * (5)}  ${to_is_below_factor * (-5)}`;
        } else {
            this.path = `
                M ${data.start_x} ${data.start_y + to_is_below_factor * 6}
                H ${data.end_x - 0.5 * this.gantt.options.padding}
                V ${data.end_y - to_is_below_factor * (this.gantt.options.bar_height / 2 + 2)}
                m ${to_is_below_factor * (-5)}  ${to_is_below_factor * (-5)}
                l ${to_is_below_factor * (5)}  ${to_is_below_factor * (5)}
                l ${to_is_below_factor * (5)}  ${to_is_below_factor * (-5)}`;
        }

    }
    calculate_path_type_sf() {
        let data = this.get_start_end();
        const left = data.start_x - 0.5 * this.gantt.options.padding;
        const to_is_below = data.end_y > data.start_y;
        const to_is_after = data.end_x > data.start_x;
        const to_is_below_factor = to_is_below ? 1 : -1;

        if (to_is_after) {
            this.path = `
                M ${data.start_x} ${data.start_y + to_is_below_factor * 5}
                H ${left}
                V ${data.end_y - to_is_below_factor * (1.5 * this.gantt.options.padding)}
                H ${data.end_x - 0.5 * this.gantt.options.padding}
                V ${data.end_y - to_is_below_factor * (this.gantt.options.bar_height / 2 + 2)}
                m ${to_is_below_factor * (-5)}  ${to_is_below_factor * (-5)}
                l ${to_is_below_factor * (5)}  ${to_is_below_factor * (5)}
                l ${to_is_below_factor * (5)}  ${to_is_below_factor * (-5)}`;
        } else {
            this.path = `
                M ${data.start_x} ${data.start_y + to_is_below_factor * 5}
                H ${data.end_x - 0.5 * this.gantt.options.padding}
                V ${data.end_y - to_is_below_factor * (this.gantt.options.bar_height / 2 + 2)}
                m ${to_is_below_factor * (-5)}  ${to_is_below_factor * (-5)}
                l ${to_is_below_factor * (5)}  ${to_is_below_factor * (5)}
                l ${to_is_below_factor * (5)}  ${to_is_below_factor * (-5)}`;
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
            start_x = this.from_task.$bar.getX() + this.from_task.$bar.getWidth();
        }

        if (this.type == "AA" || this.type == "EA") {
            end_x = this.to_task.$bar.getX();
        } else {
            end_x = this.to_task.$bar.getX() + this.to_task.$bar.getWidth();
        }

        start_y =
            this.gantt.config.header_height +
            this.gantt.options.bar_height +
            (this.gantt.options.padding + this.gantt.options.bar_height) *
            this.from_task.task._index +
            this.gantt.options.padding / 2 - this.gantt.options.bar_height / 2;

        end_y =
            this.gantt.config.header_height +
            this.gantt.options.bar_height / 2 +
            (this.gantt.options.padding + this.gantt.options.bar_height) *
            this.to_task.task._index +
            this.gantt.options.padding / 2;

        //console.log(start_x, start_y, end_x, end_y)

        return { start_x: start_x, start_y: start_y, end_x: end_x, end_y: end_y };
    }

    draw() {
        this.element = createSVG('path', {
            d: this.path,
            'data-from': this.from_task.task.id,
            'data-to': this.to_task.task.id,
        });
        this.element.addEventListener("mouseover", (e) => {
            //console.log(this.from_task.task, this.to_task.task)
            console.log(this.gantt.bars)
            const fromTask = this.gantt.bars.find(b => b.task.id == this.from_task.task.id).$bar;
            const toTask = this.gantt.bars.find(b => b.task.id == this.to_task.task.id).$bar;
            this.element.setAttribute("stroke", "#99004d");
            fromTask.style.stroke =  "#99004d";
            fromTask.style.strokeWidth = 1.5;
            toTask.style.stroke = "#99004d";
            toTask.style.strokeWidth = 1.5;
        });
        this.element.addEventListener("mouseleave", (e) => {
            console.log("MOUSELEAVE")
            const fromTask = this.gantt.bars.find(b => b.task.id == this.from_task.task.id).$bar;
            const toTask = this.gantt.bars.find(b => b.task.id == this.to_task.task.id).$bar;
            this.element.setAttribute("stroke", "black");
            fromTask.style.strokeWidth = 0;
            toTask.style.strokeWidth = 0;
        });
    }

    calculate_path() {
        switch (this.type) {
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
    }

    update() {
        this.calculate_path();
        this.element.setAttribute('d', this.path);
    }
}
