customConsole = function(message) {
    console.log('%c' + message, 'color: #e2861d;');
}

utility = {
    getResource: function(name) {
        return gamePage.resPool.get(name);
    },
    isAlmostFull: function(resourceName) {
        var resource = utility.getResource(resourceName);
        return resource.value / resource.maxValue > 0.95;
    },
    craftAll: function(craftName) {
        if(!automaticKittens.options.autocraft) {
            return;
        }
        // If the craft is enable and unlocked, let's craft it
        if (automaticKittens.options.crafting[craftName] && gamePage.workshop.getCraft(craftName).unlocked) {
            customConsole('Crafting ' + craftName);
            gamePage.craftAll(craftName);
        }
    },
    transformAll: function(resourceName, craftName) {
        if (utility.isAlmostFull(resourceName)) {
            utility.craftAll(craftName);
        }
    }
}

handler = null;

function addCheckBox(element, property) {
    var id = property + 'Chkbox';
    var checkbox = $('<input id="' + id + '" type="checkbox" />');
    checkbox.click(function() {
        automaticKittens.options[property] = $('#' + id)[0].checked;
        customConsole(automaticKittens);
    });

    element.append(checkbox);
    element.append($('<label for="' + id + '">Activate or not the ' + property + '</label>'));
    element.append($('<br />'));
}

function addCraftingCheckBox(element, property) {
    var id = "crafting" + property + 'Chkbox';
    var checkbox = $('<input id="' + id + '" type="checkbox" />');
    checkbox.click(function() {
        automaticKittens.options.crafting[property] = $('#' + id)[0].checked;
    });

    element.append(checkbox);
    element.append($('<label for="' + id + '">Activate or not the crafting of ' + property + '</label>'));
    element.append($('<br />'));
}

function addHtmlFunctionnality() {
    var parametersDiv = $('<div id="automationParameters" class="dialog help"></div>');
    parametersDiv.css('height', '380px').css('margin-top', '-190px').css('display', 'none');

    var closeParametersLink = $('<a href="#" class="close" style="position: absolute; top: 10px; right: 15px;">close</a>');
    closeParametersLink.click(function() {
        $('#automationParameters').hide();
    });

    parametersDiv.append(closeParametersLink);

    addCheckBox(parametersDiv, 'enable');
    addCheckBox(parametersDiv, 'hunt');
    addCheckBox(parametersDiv, 'pray');
    addCheckBox(parametersDiv, 'promote');
    addCheckBox(parametersDiv, 'autocraft');

    addCraftingCheckBox(parametersDiv, 'parchment');
    addCraftingCheckBox(parametersDiv, 'manuscript');
    addCraftingCheckBox(parametersDiv, 'compedium');
    addCraftingCheckBox(parametersDiv, 'blueprint');
    addCraftingCheckBox(parametersDiv, 'wood');
    addCraftingCheckBox(parametersDiv, 'beam');
    addCraftingCheckBox(parametersDiv, 'slab');
    addCraftingCheckBox(parametersDiv, 'plate');
    addCraftingCheckBox(parametersDiv, 'steel');
    

    parametersDiv.append('<br/>');

    $('#importDiv').after(parametersDiv);

    var automationLink = $('<a href="#">Automation</a>');
    automationLink.click(function() {
        $('#automationParameters').toggle();
    });
    automationLink.after(' | ');
    $("#headerLinks .links-block > a:first-child").before(automationLink);
}

/*function addHtmlFunctionnality() {
    var linkAutomation = $('<a id="kittensAutomation" href="#">Automation</a>');
    linkAutomation.click(function() {
        var focusIndex = null;
        gamePage.timer.handlers.forEach(function(installedHandler, index) {
            if(installedHandler.handler === handler) {
                focusIndex = index;
                customConsole("findIndex" + focusIndex);
            }
        });
        if(focusIndex) {
            gamePage.timer.handlers.splice(focusIndex, 1);
            customConsole("uninstall the automation... it's a cheat");
        }
    });
    $('#topBar').after(linkAutomation);
}*/

function launchAutomate() {
    window.automaticKittens = {
        /**
         * Options of the automation
         * Basicaly all the options are disable
         * Can be enable by the Automation panel
         */
        options: {
            enable: false,
            hunt: false,
            pray: false,
            promote: false,
            autocraft: false,
            crafting: {
                parchment: false,
                manuscript: false,
                compedium: false,
                blueprint: false,
                wood: false,
                beam: false,
                slab: false,
                plate: false,
                steel: false,
                gear: false,
                concrate: false,
                alloy: false,
                scaffold: false,
                ship: false
            }
        },
        observeSky: function() {
            if($('#observeBtn')[0]) {
                $('#observeBtn').click();
                customConsole('Observing the sky...');
            }
        },
        hunt: function() {
            if(utility.isAlmostFull('manpower')) {
                customConsole('Let go of the dogs after the rabbits... Or just maybe cat after unicorns !!!');
                $("a:contains('Send hunters')").click();
                utility.craftAll('parchment');
                utility.craftAll('manuscript');
                utility.craftAll('compedium');
                utility.craftAll('blueprint');
            }
        },
        pray: function() {
            if(utility.isAlmostFull('faith')) {
                customConsole('PRAISE THE SUN !');
				gamePage.religion.praise();
            }
        },
        promote: function() {
            if(utility.isAlmostFull('gold')) {
                customConsole('Kitten promoted !!!')
                gamePage.village.promoteKittens();
            }
        },
        craft: function() {
            utility.transformAll('catnip', 'wood');
            utility.transformAll('wood', 'beam');
            utility.transformAll('minerals', 'slab');
            utility.transformAll('coal', 'steel');
            utility.transformAll('iron', 'plate');
        }
    };

    handler = dojo.hitch(this, function() {
        if(!automaticKittens.options.enable) {
            return;
        }
        automaticKittens.observeSky();
        if(automaticKittens.options.hunt) {
            automaticKittens.hunt();
        }
        if(automaticKittens.options.pray) {
            automaticKittens.pray();
        }
        if(automaticKittens.options.promote) {
            automaticKittens.promote();
        }
        if(automaticKittens.options.autocraft) {
            automaticKittens.craft();
        }
    });

    gamePage.timer.addEvent(handler, 3); // Once per 3 ticks
    customConsole("automation activated - please update config to enable automation");
}

if(window.automaticKittens === undefined) {
    launchAutomate();
    addHtmlFunctionnality();
    setInterval(function() { $("div.btnContent:contains('Gather catnip')").click(); }, 1);
}