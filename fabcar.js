/*
 * Copyright IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { Contract } = require('fabric-contract-api');

class FabCar extends Contract {

    async initLedger(ctx) {
        console.info('============= START : Initialize Ledger ===========');
        const users = [
            {
                role:"logistic",
                userEmail:"test1",
                password:"pasword123",
                logistic: [],
                companyName:"testCompany",
                companyAddress:"testAddreess",
                companyEmail:"testCompanyEmail",
                phone:"0711111111"
            },
            {
                role:"warehouse",
                userEmail:"test2",
                password:"pasword123",
                logistic: [],
                companyName:"testCompany2",
                companyAddress:"testAddreess2",
                companyEmail:"testCompanyEmail2",
                phone:"0711111112"
                }
        ];

        for (let i = 0; i < users.length; i++) {
            users[i].docType = 'car';
            await ctx.stub.putState('USER' + i, Buffer.from(JSON.stringify(users[i])));
            console.info('Added <--> ', users[i]);
        }
        console.info('============= END : Initialize Ledger ===========');
    }

    async login(ctx, UserId) {
        const carAsBytes = await ctx.stub.getState(UserId); // get the car from chaincode state
        if (!carAsBytes || carAsBytes.length === 0) {
            throw new Error(`${UserId} does not exist`);
        }
        console.log(carAsBytes.toString());
        return carAsBytes.toString();
    }

    async createCar(ctx, id, role, userEmail, password, logistic,companyName,companyAddress,companyEmail,phone) {
        console.info('============= START : Create User ===========');
        console.log("workung ereate car")

        const car = {
            docType: 'car',
            role,
            userEmail,
            password,
            logistic: [],
            companyName,
            companyAddress,
            companyEmail,
            phone
        };

        await ctx.stub.putState(id, Buffer.from(JSON.stringify(car)));
        console.info('============= END : Create User ===========');
    }

    async queryAllusers(ctx) {
        const startKey = '';
        const endKey = '';
        const allResults = [];
        for await (const {key, value} of ctx.stub.getStateByRange(startKey, endKey)) {
            const strValue = Buffer.from(value).toString('utf8');
            let record;
            try {
                record = JSON.parse(strValue);
            } catch (err) {
                console.log(err);
                record = strValue;
            }
            allResults.push({ Key: key, Record: record });
        }
        console.info(allResults);
        return JSON.stringify(allResults);
    }

    async changeCarOwner(ctx, carNumber, newOwner) {
        console.info('============= START : changeCarOwner ===========');

        const carAsBytes = await ctx.stub.getState(carNumber); // get the car from chaincode state
        if (!carAsBytes || carAsBytes.length === 0) {
            throw new Error(`${carNumber} does not exist`);
        }
        const car = JSON.parse(carAsBytes.toString());
        car.owner = newOwner;

        await ctx.stub.putState(carNumber, Buffer.from(JSON.stringify(car)));
        console.info('============= END : changeCarOwner ===========');
    }

    // #########################add logistic####################################

    async addLogistic(ctx, userid, orderID, retailerid,product,quantity,status,supplierID) {
        console.info('============= START : changeCarOwner ===========');

        const carAsBytes = await ctx.stub.getState(userid); // get the car from chaincode state
        if (!carAsBytes || carAsBytes.length === 0) {
            throw new Error(`${userid} does not exist`);
        }
        
        const logis = {
            orderID,
            retailerid,
            docType: 'logis',
            product,
            quantity,
            status,
            supplierID

            
        };
        const car = JSON.parse(carAsBytes.toString());
        console.log(car.logistic);
        car.logistic.push(logis);

        // const car = JSON.parse(carAsBytes.toString());

        await ctx.stub.putState(userid, Buffer.from(JSON.stringify(car)));
        console.info('============= END : changeCarOwner ===========');
    }
    // ######################add logistic########################################

    // ########################update status############################
    async UpdateStatus(ctx, UserId,OrderId, newStatus) {
        console.info('============= START : changeCarOwner ===========');

        const carAsBytes = await ctx.stub.getState(UserId); // get the car from chaincode state
        if (!carAsBytes || carAsBytes.length === 0) {
            throw new Error(`${id} does not exist`);
        }
        const car = JSON.parse(carAsBytes.toString());
        const resultUpStatus=car.logistic;
        // car.logistic = newOwner;

        for(let i=0;i<resultUpStatus.length;i++){
            if(resultUpStatus[i].orderID==OrderId){
                resultUpStatus[i].status= newStatus;
            }
        }

        await ctx.stub.putState(UserId, Buffer.from(JSON.stringify(car)));
        console.info('============= END : changeCarOwner ===========');
    }

    // ###################update status###########################

}

module.exports = FabCar;
