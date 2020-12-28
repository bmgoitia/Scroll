
if(typeof $ == "undefined" || typeof jQuery == "undefined"){
    throw 'JQuery is required to use ScrollCalculator';
}

document.onreadystatechange = (() => ScrollCalculator.ready()); // esto hace que cuando se recargue la 
// página, se vuelva a ejecutar ScrollCalculator.ready()

var ScrollCalculator = class{ 
    static vh;
    static vw;
    static documentLoaded = false;

    static init = function(){
        ScrollCalculator.updateMeasures();
        window.addEventListener('resize', ScrollCalculator.updateMeasures);
    } 

    static ready = function(){
        ScrollCalculator.documentLoaded = true;
        ScrollCalculator.init();
    }

    /**
     * Recalculate viewport measures
     * 
     * @throws error if document it's not loaded yet
     */
    static updateMeasures = function(){
        ScrollCalculator.checkReady();
        ScrollCalculator.vh = window.innerHeight;
        ScrollCalculator.vw = window.innerWidth; 
    }

    static checkReady = function(){
        if(ScrollCalculator.documentLoaded == false)
            throw 'Wait until the document is loaded to start using the ScrollCalculator functionality';
    }

    /**
     * Returns the Y scroll pixel where the specified element side 
     * is on specified viewport side
     * 
     * @param  {object} element      Dom target element
     * @param  {string} elementSide  Dom target element side (top, middle, bottom)
     * @param  {string} viewportSide Viewport side (top, middle, bottom)
     * @param  {int} percentageFromViewportSide 
     *         Distance from target 
     *         element side to viewport side for wich the Y Coordinate 
     *         will be calculated (the percentage references the viewport size)
     * 
     * @return {float} Y coordinate
     */
    static getYCoordinateAt = function(element, elementSide = ScrollCalculator.MIDDLE, viewportSide = ScrollCalculator.MIDDLE, percentageFromViewportSide=0){
        ScrollCalculator.checkReady();

        let jQueryTarget = $(element);

        if(jQueryTarget.length == 0){
            throw 'Cannot found supplied element';
        }

        let target = jQueryTarget[0]; // importante: seleccionamos el elemento del DOM en sí
        

        let scrollCoordinates = {
            y: null,
            x: null //TODO: Not implemented yet
        };

        scrollCoordinates.y = ScrollCalculator.getYScrollCoordFromTargetTop(target, viewportSide);
        scrollCoordinates.y -= ScrollCalculator.getViewportPercentageInPixels(percentageFromViewportSide);

        switch(elementSide){ //
            case ScrollCalculator.MIDDLE: // propiedad creada en la línea 134
                scrollCoordinates.y += target.offsetHeight / 2;
                break;
            case ScrollCalculator.BOTTOM: // propiedad creada en la línea 133
                scrollCoordinates.y += target.offsetHeight;
                break;
        } 


        return scrollCoordinates.y;
    }

    static getYScrollCoordFromTargetTop = function(target, viewportSide){
        let viewportYDistanceFromTargetTop = null;

        switch(viewportSide){
            case ScrollCalculator.TOP:
                viewportYDistanceFromTargetTop = target.getBoundingClientRect().top;
                break;

            case ScrollCalculator.MIDDLE:
                viewportYDistanceFromTargetTop = target.getBoundingClientRect().top - (ScrollCalculator.vh / 2);
                break;

            case ScrollCalculator.BOTTOM:
                viewportYDistanceFromTargetTop = target.getBoundingClientRect().top - ScrollCalculator.vh;
                break;
        }  

        if(viewportYDistanceFromTargetTop == null){
            throw 'Cannot obtain measures from supplied element, please check that element its displayed';
        }

        let scrollYCoordinate = viewportYDistanceFromTargetTop + window.scrollY;     


        return scrollYCoordinate;
    }

    static getViewportPercentageInPixels = function(percentage){
        let pixels = 0;
        
        if(!isNaN(percentage)){
            let absolutePercentage = Math.abs(percentage);
            pixels = (absolutePercentage / 100) * ScrollCalculator.vh;

            if(percentage < 0){
                pixels *= -1;
            }

        }

        return pixels;
    }

}

ScrollCalculator.TOP = 'top';
ScrollCalculator.BOTTOM = 'bottom';
ScrollCalculator.MIDDLE = 'middle';
