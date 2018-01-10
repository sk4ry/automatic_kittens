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
    
    var enableAutomationCheckbox = $('<input id="enableAutomation" type="checkbox" />');
    enableAutomationCheckbox.click(function() {
        automaticKittens.options.enable = $('#enableAutomation')[0].checked;
        customConsole(automaticKittens);
    });

    parametersDiv.append(enableAutomationCheckbox);
    parametersDiv.append('<label for="enableAutomation">Activate or not the automation</label>');

    var enableHuntingCheckbox = $('<input id="enableHunting" type="checkbox" />');
    enableHuntingCheckbox.click(function() {
        automaticKittens.options.hunt = $('#enableHunting')[0].checked;
        customConsole(automaticKittens);
    });

    parametersDiv.append(enableHuntingCheckbox);
    parametersDiv.append('<label for="enableHunting">Enable hunting</label>');

    var enablePraying = $('<input id="enablePraying" type="checkbox" />');
    enablePraying.click(function() {
        automaticKittens.options.crafting.pray = $('#enablePraying')[0].checked;
        customConsole(automaticKittens);
    });

    parametersDiv.append(enablePraying);
    parametersDiv.append('<label for="enablePraying">Enable praying</label>');

    var enablePromote = $('<input id="enablePromote" type="checkbox" />');
    enablePromote.click(function() {
        automaticKittens.options.crafting.promote = $('#enablePromote')[0].checked;
        customConsole(automaticKittens);
    });

    parametersDiv.append(enablePromote);
    parametersDiv.append('<label for="enablePromote">Enable Promote kittens</label>');

    var enableAutocraft = $('<input id="enableAutocraft" type="checkbox" />');
    enableAutocraft.click(function() {
        automaticKittens.options.crafting.autocraft = $('#enableAutocraft')[0].checked;
        customConsole(automaticKittens);
    });

    parametersDiv.append(enableAutocraft);
    parametersDiv.append('<label for="enableAutocraft">Enable Autocraft</label>');

    var enableParchmentCrafting = $('<input id="enableParchment" type="checkbox" />');
    enableParchmentCrafting.click(function() {
        automaticKittens.options.crafting.parchment = $('#enableParchment')[0].checked;
        customConsole(automaticKittens);
    });

    parametersDiv.append(enableParchmentCrafting);
    parametersDiv.append('<label for="enableParchment">Enable crafting Parchment</label>');

    var enableManuscriptCrafting = $('<input id="enableManuscript" type="checkbox" />');
    enableManuscriptCrafting.click(function() {
        automaticKittens.options.crafting.manuscript = $('#enableManuscript')[0].checked;
        customConsole(automaticKittens);
    });

    parametersDiv.append(enableManuscriptCrafting);
    parametersDiv.append('<label for="enableManuscript">Enable crafting Manuscript</label>');

    var enableCompediumCrafting = $('<input id="enableCompedium" type="checkbox" />');
    enableCompediumCrafting.click(function() {
        automaticKittens.options.crafting.compedium = $('#enableCompedium')[0].checked;
        customConsole(automaticKittens);
    });

    parametersDiv.append(enableCompediumCrafting);
    parametersDiv.append('<label for="enableCompedium">Enable crafting Compedium</label>');

    var enableBlueprintCrafting = $('<input id="enableBlueprint" type="checkbox" />');
    enableBlueprintCrafting.click(function() {
        automaticKittens.options.crafting.blueprint = $('#enableBlueprint')[0].checked;
        customConsole(automaticKittens);
    });

    parametersDiv.append(enableBlueprintCrafting);
    parametersDiv.append('<label for="enableBlueprint">Enable crafting Blueprint</label>');

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
            if(isAlmostFull('faith')) {
                customConsole('PRAISE THE SUN !');
				gamePage.religion.praise();
            }
        },
        promote: function() {
            if(utility.isAlmostFull('gold')) {
                customConsole('Kitten promoted !!!')
                gamePage.village.promoteKittens();
            }
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
    });

    gamePage.timer.addEvent(handler, 3); // Once per 3 ticks
    customConsole("automation activated");
}

if(window.automaticKittens === undefined) {
    launchAutomate();
    addHtmlFunctionnality();
}