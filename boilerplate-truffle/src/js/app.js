App = {
    web3Provider: null,
    contracts: {},

    init: function () {
        // Load pets.
        console.log("Starting to do the thing ...");
        return App.initWeb3();
    },

    initWeb3: function () {
        // Is there an injected web3 instance?
        if (typeof web3 !== 'undefined') {
            App.web3Provider = web3.currentProvider;
        } else {
            // If no injected web3 instance is detected, fall back to Ganache
            App.web3Provider = new Web3.providers.HttpProvider('http://localhost:8545');
        }
        web3 = new Web3(App.web3Provider);

        return App.initContract();
    },

    initContract: function () {
        $.getJSON('Showroom.json', function (data) {
            // Get the necessary contract artifact file and instantiate it with truffle-contract
            var AdoptionArtifact = data;
            App.contracts.Adoption = TruffleContract(AdoptionArtifact);
            // Set the provider for our contract
            App.contracts.Adoption.setProvider(App.web3Provider);
            // Use our contract to retrieve and mark the adopted pets
            var showroomInstance;
            App.contracts.Adoption.deployed().then(function (instance) {
                showroomInstance = instance;
                return showroomInstance.getName.call();
            }).then(function (name) {
                $("#name").html(name);
            }).catch(function (err) {
                console.log(err.message);
            });
            App.contracts.Adoption.deployed().then(function (instance) {
                showroomInstance = instance;
                return showroomInstance.getLocation.call();
            }).then(function (location) {
                $("#location").html(location);
            }).catch(function (err) {
                console.log(err.message);
            });
        });
    },
};

$(function () {
    $(window).load(function () {
        App.init();
    });
});
