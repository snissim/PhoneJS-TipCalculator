"use strict";

TipCalculator.Home = function(params) {
    var DEFAULT_TIP_PERCENT = 15,
        ROUND_UP = 1,
        ROUND_DOWN = -1,
        ROUD_NONE = 0;

    var billTotal = ko.observable(),
        roundMode = ko.observable(ROUD_NONE),
        tipPercent = ko.observable(DEFAULT_TIP_PERCENT),
        splitNum = ko.observable(1);

    function billTotalAsNumber() {
        return billTotal() || 0;
    }

    billTotal.subscribe(function() {
        roundMode(ROUD_NONE);
    });

    tipPercent.subscribe(function() {
        roundMode(ROUD_NONE);
    });

    splitNum.subscribe(function() {
        roundMode(ROUD_NONE);
    });

    var totalTip = ko.computed(function() {
        return tipPercent() / 100 * billTotalAsNumber();
    });

    var totalPerPerson = ko.computed(function() {
        var personSum = (totalTip() + billTotalAsNumber()) / splitNum();
        switch(roundMode()) {
            case ROUND_DOWN:
                if(Math.floor(personSum) * splitNum() >= billTotalAsNumber()) {
                    return Math.floor(personSum);
                } else {
                    return personSum;
                }
                break
            case ROUND_UP:
                return Math.ceil(personSum);
            case ROUD_NONE:
                return personSum;
        }
    });

    var totalToPay = ko.computed(function() {
        return totalPerPerson() * splitNum();
    });

    var tipPerPerson = ko.computed(function() {
        return totalTip() / splitNum();
    });

    function roundUp() {
        roundMode(ROUND_UP);
    }
        
    function roundDown() {
        roundMode(ROUND_DOWN);
    }

    function viewShown() {
        $("#billTotalInput").data("dxNumberBox").focus();
    }

    return {
        viewShown: viewShown,
        billTotal: billTotal,
        totalTip: totalTip,
        totalToPay: totalToPay,
        totalPerPerson: totalPerPerson,
        tipPerPerson:tipPerPerson,
        tipPercent: tipPercent,
        splitNum: splitNum,
        roundUp: roundUp,
        roundDown: roundDown
    };
};