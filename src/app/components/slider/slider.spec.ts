import { TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Slider } from './slider';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('Slider', () => {
    let slider: Slider;
    let fixture: ComponentFixture<Slider>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [NoopAnimationsModule],
            declarations: [Slider]
        });

        fixture = TestBed.createComponent(Slider);
        slider = fixture.componentInstance;
    });

    it('should created by default', () => {
        fixture.detectChanges();

        const sliderEl = fixture.debugElement.query(By.css('div')).nativeElement;
        expect(sliderEl).toBeTruthy();
    });

    it('should disabled', () => {
        slider.disabled = true;
        fixture.detectChanges();

        const sliderEl = fixture.debugElement.query(By.css('div')).nativeElement;
        const clickSpy = spyOn(slider, 'updateDomData').and.callThrough();
        const spanEl = fixture.debugElement.query(By.css('.p-slider-handle'));
        spanEl.nativeElement.dispatchEvent(new Event('mousedown'));
        sliderEl.click();
        fixture.detectChanges();

        expect(sliderEl.className).toContain('p-disabled');
        expect(clickSpy).not.toHaveBeenCalled();
        expect(slider.dragging).not.toEqual(true);
    });

    it('should animate', () => {
        slider.animate = true;
        fixture.detectChanges();

        const sliderEl = fixture.debugElement.query(By.css('div')).nativeElement;
        sliderEl.click();
        expect(sliderEl.className).toContain('p-slider-animate');
    });

    it('should change styles', () => {
        slider.style = { height: '300px' };
        slider.styleClass = 'Primeng ROCKS!';
        fixture.detectChanges();

        const sliderEl = fixture.debugElement.query(By.css('div')).nativeElement;
        expect(sliderEl.className).toContain('Primeng ROCKS!');
        expect(sliderEl.style.height).toEqual('300px');
    });

    it('should change orientation', () => {
        slider.orientation = 'vertical';
        fixture.detectChanges();

        const sliderEl = fixture.debugElement.query(By.css('div')).nativeElement;
        expect(sliderEl.className).toContain('p-slider-vertical');
    });

    it('should have a range', () => {
        slider.range = true;
        fixture.detectChanges();

        const sliderEl = fixture.debugElement.query(By.css('div')).nativeElement;
        expect(sliderEl.children.length).toEqual(3);
    });

    it('should set min', () => {
        slider.min = 20;
        fixture.detectChanges();

        slider.updateValue(19);
        fixture.detectChanges();

        slider.cd.detectChanges();
        const spanEl = fixture.debugElement.query(By.css('span')).nativeElement;
        expect(slider.handleValue).toEqual(0);
        expect(spanEl.style.width).toEqual('0%');
    });

    it('should set max', () => {
        slider.max = 90;
        fixture.detectChanges();

        slider.updateValue(91);
        fixture.detectChanges();

        slider.cd.detectChanges();
        const spanEl = fixture.debugElement.query(By.css('span')).nativeElement;
        expect(slider.handleValue).toEqual(100);
        expect(spanEl.style.width).toEqual('100%');
    });

    it('should listen onChange', () => {
        fixture.detectChanges();

        let value = 1;
        slider.onChange.subscribe((data) => (value = data.value));
        slider.updateValue(91);
        fixture.detectChanges();

        expect(value).toEqual(91);
    });

    it('should change value with touch events (horizontal)', () => {
        fixture.detectChanges();

        slider.updateValue(91);
        slider.handleValue = 91;
        fixture.detectChanges();

        const touchstartEvent: any = document.createEvent('CustomEvent');
        touchstartEvent.changedTouches = [
            {
                clientX: 450
            }
        ];
        touchstartEvent.initEvent('touchstart', true, true);
        const touchmoveEvent: any = document.createEvent('CustomEvent');
        touchmoveEvent.changedTouches = [
            {
                clientX: 400
            }
        ];
        touchmoveEvent.initEvent('touchmove', true, true);
        const spanEl = fixture.debugElement.query(By.css('.p-slider-handle'));
        spanEl.nativeElement.dispatchEvent(touchstartEvent);
        fixture.detectChanges();

        spanEl.nativeElement.dispatchEvent(touchmoveEvent);
        fixture.detectChanges();

        expect(slider.value).toBeLessThan(91);
    });

    it('should change value with touch events (vertical)', () => {
        fixture.detectChanges();

        slider.orientation = 'vertical';
        slider.updateValue(91);
        slider.handleValue = 91;
        fixture.detectChanges();

        const touchstartEvent: any = document.createEvent('CustomEvent');
        touchstartEvent.changedTouches = [
            {
                clientY: 400
            }
        ];
        touchstartEvent.initEvent('touchstart', true, true);
        const touchmoveEvent: any = document.createEvent('CustomEvent');
        touchmoveEvent.changedTouches = [
            {
                clientY: 450
            }
        ];
        touchmoveEvent.initEvent('touchmove', true, true);
        const spanEl = fixture.debugElement.query(By.css('.p-slider-handle'));
        spanEl.nativeElement.dispatchEvent(touchstartEvent);
        fixture.detectChanges();

        spanEl.nativeElement.dispatchEvent(touchmoveEvent);
        fixture.detectChanges();

        expect(slider.value).toBeLessThan(91);
    });

    it('should change value with mouse events (horizontal)', () => {
        fixture.detectChanges();

        const bindDragListenersSpy = spyOn(slider, 'bindDragListeners').and.callThrough();
        const spanEl = fixture.debugElement.query(By.css('.p-slider-handle'));
        spanEl.nativeElement.dispatchEvent(new Event('mousedown'));
        fixture.detectChanges();

        expect(bindDragListenersSpy).toHaveBeenCalled();
        expect(slider.dragging).toEqual(true);
        const mousemoveEvent: any = document.createEvent('CustomEvent');
        mousemoveEvent.pageX = 300;
        mousemoveEvent.initEvent('mousemove', true, true);
        document.dispatchEvent(mousemoveEvent);
        document.dispatchEvent(mousemoveEvent as MouseEvent);
        fixture.detectChanges();

        expect(slider.value).toBeGreaterThan(0);
        document.dispatchEvent(new Event('mouseup'));
        fixture.detectChanges();

        expect(slider.dragging).toEqual(false);
        const unbindDragListenersSpy = spyOn(slider, 'unbindDragListeners').and.callThrough();
        slider.ngOnDestroy();
        fixture.detectChanges();

        expect(unbindDragListenersSpy).toHaveBeenCalled();
    });

    it('should change value with mouse events (vertical)', () => {
        slider.orientation = 'vertical';
        fixture.detectChanges();

        const bindDragListenersSpy = spyOn(slider, 'bindDragListeners').and.callThrough();
        const spanEl = fixture.debugElement.query(By.css('.p-slider-handle'));
        spanEl.nativeElement.dispatchEvent(new Event('mousedown'));
        fixture.detectChanges();

        expect(bindDragListenersSpy).toHaveBeenCalled();
        expect(slider.dragging).toEqual(true);
        const mousemoveEvent: any = document.createEvent('CustomEvent');
        mousemoveEvent.pageY = 115;
        mousemoveEvent.initEvent('mousemove', true, true);
        document.dispatchEvent(mousemoveEvent);
        document.dispatchEvent(mousemoveEvent as MouseEvent);
        fixture.detectChanges();

        expect(slider.value).toBeGreaterThan(0);
        document.dispatchEvent(new Event('mouseup'));
        fixture.detectChanges();

        expect(slider.dragging).toEqual(false);
        const unbindDragListenersSpy = spyOn(slider, 'unbindDragListeners').and.callThrough();
        slider.ngOnDestroy();
        fixture.detectChanges();

        expect(unbindDragListenersSpy).toHaveBeenCalled();
    });

    it('should change values with keyboard events', () => {
        slider.updateValue(0);
        fixture.detectChanges();

        const incrementValueSpy = spyOn(slider, 'incrementValue').and.callThrough();
        const spanEl = fixture.debugElement.query(By.css('.p-slider-handle'));
        spanEl.nativeElement.dispatchEvent(new KeyboardEvent('keydown', { code: 'ArrowRight' }));
        spanEl.nativeElement.dispatchEvent(new KeyboardEvent('keydown', { code: 'ArrowRight' }));
        fixture.detectChanges();
        expect(incrementValueSpy).toHaveBeenCalled();

        const decrementValueSpy = spyOn(slider, 'decrementValue').and.callThrough();
        spanEl.nativeElement.dispatchEvent(new KeyboardEvent('keydown', { code: 'ArrowLeft' }));
        fixture.detectChanges();
        expect(decrementValueSpy).toHaveBeenCalled();

        const onDragEndSpy = spyOn(slider, 'onDragEnd').and.callThrough();
        const onSlideEndEmitterSpy = spyOn(slider.onSlideEnd, 'emit').and.callThrough();
        spanEl.nativeElement.dispatchEvent(new KeyboardEvent('keydown', { code: 'Tab' }));
        fixture.detectChanges();
        expect(onDragEndSpy).toHaveBeenCalled();
        expect(onSlideEndEmitterSpy).toHaveBeenCalled();
        expect(slider.value).toEqual(1);
    });

    it('should increment value with step', () => {
        slider.value = 0;
        slider.step = 2;
        fixture.detectChanges();

        const spanEl = fixture.debugElement.query(By.css('.p-slider-handle'));
        spanEl.nativeElement.dispatchEvent(new Event('mousedown'));
        fixture.detectChanges();

        expect(slider.dragging).toEqual(true);
        const mousemoveEvent: any = document.createEvent('CustomEvent');
        mousemoveEvent.pageX = 300;
        mousemoveEvent.initEvent('mousemove', true, true);
        document.dispatchEvent(mousemoveEvent);
        document.dispatchEvent(mousemoveEvent as MouseEvent);
        fixture.detectChanges();

        expect(slider.value).toBeGreaterThan(0);
        expect(slider.value % 2).toEqual(0);
        document.dispatchEvent(new Event('mouseup'));
        fixture.detectChanges();

        expect(slider.dragging).toEqual(false);
        slider.ngOnDestroy();
        fixture.detectChanges();
    });

    it('should increment value with decimal step and decimal max', () => {
        slider.value = 0.02;
        slider.step = 0.01;
        slider.max = 2.5;
        fixture.detectChanges();

        const spanEl = fixture.debugElement.query(By.css('.p-slider-handle'));
        spanEl.nativeElement.dispatchEvent(new Event('mousedown'));
        fixture.detectChanges();

        expect(slider.dragging).toEqual(true);
        const mousemoveEvent: any = document.createEvent('CustomEvent');
        mousemoveEvent.pageX = 300;
        mousemoveEvent.initEvent('mousemove', true, true);
        document.dispatchEvent(mousemoveEvent);
        document.dispatchEvent(mousemoveEvent as MouseEvent);
        fixture.detectChanges();

        expect(slider.value).toBeGreaterThan(0.02);
        document.dispatchEvent(new Event('mouseup'));
        fixture.detectChanges();

        expect(slider.dragging).toEqual(false);
        slider.ngOnDestroy();
        fixture.detectChanges();
    });

    it('should decrement value with step', () => {
        slider.value = 90;
        slider.step = 2;
        fixture.detectChanges();

        const spanEl = fixture.debugElement.query(By.css('.p-slider-handle'));
        spanEl.nativeElement.dispatchEvent(new Event('mousedown'));
        fixture.detectChanges();

        expect(slider.dragging).toEqual(true);
        const mousemoveEvent: any = document.createEvent('CustomEvent');
        mousemoveEvent.pageX = 300;
        mousemoveEvent.initEvent('mousemove', true, true);
        document.dispatchEvent(mousemoveEvent);
        document.dispatchEvent(mousemoveEvent as MouseEvent);
        fixture.detectChanges();

        expect(slider.value).toBeGreaterThan(0);
        expect(slider.value % 2).toEqual(0);
        document.dispatchEvent(new Event('mouseup'));
        fixture.detectChanges();

        expect(slider.dragging).toEqual(false);
        slider.ngOnDestroy();
        fixture.detectChanges();
    });

    it('should decrement value with decimal step and decimal max', () => {
        slider.value = 2.4;
        slider.step = 0.01;
        slider.max = 2.5;
        fixture.detectChanges();

        const spanEl = fixture.debugElement.query(By.css('.p-slider-handle'));
        spanEl.nativeElement.dispatchEvent(new Event('mousedown'));
        fixture.detectChanges();

        expect(slider.dragging).toEqual(true);
        const mousemoveEvent: any = document.createEvent('CustomEvent');
        mousemoveEvent.pageX = 300;
        mousemoveEvent.initEvent('mousemove', true, true);
        document.dispatchEvent(mousemoveEvent);
        document.dispatchEvent(mousemoveEvent as MouseEvent);
        fixture.detectChanges();

        expect(slider.value).toBeGreaterThan(0);
        expect(slider.value).toBeLessThan(2.4);
        document.dispatchEvent(new Event('mouseup'));
        fixture.detectChanges();

        expect(slider.dragging).toEqual(false);
        slider.ngOnDestroy();
        fixture.detectChanges();
    });

    it('should select range', () => {
        slider.range = true;
        slider.handleValues = [20, 80];
        slider.values = [20, 80];
        slider.style = { width: '600px' };
        fixture.detectChanges();

        const sliderHandlers = fixture.debugElement.queryAll(By.css('.p-slider-handle'));
        const firstSliderHandler = sliderHandlers[0];
        firstSliderHandler.nativeElement.dispatchEvent(new Event('mousedown'));
        expect(slider.dragging).toEqual(true);
        const mousemoveEvent: any = document.createEvent('CustomEvent');
        mousemoveEvent.pageX = 300;
        mousemoveEvent.initEvent('mousemove', true, true);
        document.dispatchEvent(mousemoveEvent as MouseEvent);
        fixture.detectChanges();

        expect(slider.values[0]).toBeGreaterThan(20);
        document.dispatchEvent(new Event('mouseup'));
        fixture.detectChanges();
    });

    it('should select range with step', () => {
        slider.range = true;
        slider.step = 2;
        slider.handleValues = [20, 80];
        slider.style = { width: '600px' };
        slider.values = [20, 80];
        fixture.detectChanges();

        const sliderHandlers = fixture.debugElement.queryAll(By.css('.p-slider-handle'));
        const firstSliderHandler = sliderHandlers[0];
        firstSliderHandler.nativeElement.dispatchEvent(new Event('mousedown'));
        expect(slider.dragging).toEqual(true);
        const mousemoveEvent: any = document.createEvent('CustomEvent');
        mousemoveEvent.pageX = 300;
        mousemoveEvent.initEvent('mousemove', true, true);
        document.dispatchEvent(mousemoveEvent as MouseEvent);
        fixture.detectChanges();

        expect(slider.values[0]).toBeGreaterThan(20);
        expect(slider.values[0] % 2).toEqual(0);
        document.dispatchEvent(new Event('mouseup'));
        fixture.detectChanges();
    });
});
