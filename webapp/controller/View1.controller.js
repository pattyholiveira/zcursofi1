sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        return Controller.extend("zcursopoapp1.controller.View1", {
            onInit: function () {

            },

            onQuery: function ()  {
                this.getView().getModel().read('/AlunosFioriSet', {
                    filters: [
                        new sap.ui.model.Filter("Usuario", sap.ui.model.FilterOperator.EQ, 'RARIZA')
                    ],
                    success: function (oData, oReponse) {
                        sap.m.MessageBox.success(that.getView().getModel("i18n").getResourceBundle().getText("lblMsgQueryOk"));
                   
                    },
                    error: function (oError) {
                        sap.m.MessageBox.error(that.getView().getModel("i18n").getResourceBundle().getText("lblMsgQueryError"));
                    }
                });
            },

            onUpdate: function () {
                var that = this;
                var usuario = this.getView().byId("idusuario").getValue();
                var nome = this.getView().byId("idNome").getValue();
                var projesegw = this.getView().byId("idProjSegw").getValue();
                var email = this.getView().byId("idEmail").getValue();
 
                var oStrPath = this.getView().byId("idtabelaluno").getSelectedContextPaths();
 
                var oDados = {
                    Usuario: usuario,
                    Nome: nome,
                    ProjetoSegw: projesegw,
                    Email: email
                }
 
                this.getView().getModel().update(oStrPath[0], oDados, {
                    success: function (oData, oReponse) {
                        sap.m.MessageBox.success(that.getView().getModel("i18n").getResourceBundle().getText("lblMsgUpdateOk"));
                        that.getView().byId("idusuario").setValue("");
                        that.getView().byId("idNome").setValue("");
                        that.getView().byId("idProjSegw").setValue("");
                        that.getView().byId("idEmail").setValue("");
                    },
                    error: function (oError) {
                        sap.m.MessageBox.error(that.getView().getModel("i18n").getResourceBundle().getText("lblMsgUpdateError"));
                    }
                });
            },

            //deletar 1 registro de cada vez
            //onDelete: function (){
            //    var that = this;
            //    var sPath = this.getView().byId("idtabelaluno").getSelectedContextPaths();
            //
            //    this.getView().getModel().remove(sPath[0], {
            //        success: function(odata, oReponse){
            //            sap.m.MessageBox.success(that.getView().getModel("i18n").getResourceBundle().getText("lblMsgRemoveOk"));
            //        return;
            //        },
            //        error: function(oError){
            //
            //        }
            //    })
            //},

            //deletar mais de um registro
            onDelete: function () {
                var that = this;
                var totRemove = this.getView().byId("idtabelaluno").getSelectedItems();
                
                for (var i = 0; i < totRemove.length; i++) {
                    var sPath = totRemove[i].getBindingContextPath();//this.getView().byId("idtabelaluno").getSelectedContextPaths();
 
                    this.getView().getModel().remove(sPath, {
                        success: function (odata, oReponse) {
                            sap.m.MessageBox.success(that.getView().getModel("i18n").getResourceBundle().getText("lblMsgRemoveOk"));
                            return;
                        },
                        error: function (oError) {
 
                        }
                    })
                }
            },

            onCreate: function () {
                var that = this;
                var usuario =  this.getView().byId("idUsuario").getValue();
                var nome =  this.getView().byId("idNome").getValue();
                var projsegw =  this.getView().byId("idProjSegw").getValue();
                var email =  this.getView().byId("idEmail").getValue();

                if(!usuario){
                    sap.m.MessageBox.error(this.getView().getModel("i18n").getResourceBundle().getText("lblMsgErrorUser"));
                    return;
                }

                var oDados = {
                    Usuario: usuario,
                    Nome: nome,
                    ProjetoSegw: projsegw,
                    Email: email
                }

                this.getView().getModel().create('/AlunoFioriSet', oDados, {
                    success: function(oData, oResponse){
                        sap.m.MessageBox.success(that.getView().getModel("i18n").getResourceBundle().getText("lblMsgCreateOk"));
                        that.getView().byId("idUsuario").setValue("");
                        that.getView().byId("idNome").setValue("");
                        that.getView().byId("idProjSegw").setValue("");
                        that.getView().byId("idEmail").setValue("");
                    },

                    error: function(oError){
                        sap.m.MessageBox.success(that.getView().getModel("i18n").getResourceBundle().getText("lblMsgCreateErro"));
                    }
                })


            }
        });
    });
