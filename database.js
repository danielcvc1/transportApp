import { DataTypes, Sequelize } from "sequelize";


const sequelize = new Sequelize("public_transport_app", "root", "root", {
    host: "localhost",
    dialect: "mysql",
    port: 5003,
})


const User = sequelize.define(
    "User", {
    firstName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    verified: {
        type: DataTypes.DATE,
        allowNull: true,
        default: null,
    },
    isVerified: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        default: false,
    },
    isAdmin: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        default: false,

    }
}
    ,
    {
        tableName: "users",
        underscored: true,
        timestamps: true,
    }

)


const userToken = sequelize.define(
    "Token", {
    value: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },

    type: {
        type: DataTypes.STRING,
        allowNull: false,

    }, expirationDate: {
        type: DataTypes.DATE,
        allowNull: false,
    },
},
    {
        tableName: "tokens",
        underscored: true,
        timestamps: true,
    }

)


const Route = sequelize.define(
    "Route", {
    nameOfRoute: {
        type: DataTypes.STRING,
        allowNull: true,
    },
}
    ,
    {
        tableName: "routes",
        underscored: true,
        timestamps: true,
    }

)

const Stop = sequelize.define(
    "Stop", {
    nameOfStop: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    adress: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    typeOfStop: {
        type: DataTypes.STRING,
        allowNull: false,
    },


}
    ,
    {
        tableName: "stops",
        underscored: true,
        timestamps: true,
    }
)


const StopRoute = sequelize.define(
    "StopRoute", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    routeId: {
        type: DataTypes.INTEGER,
        unique:false,
        onUpdate: "Cascade",
        onDelete: "Cascade",
    },
    stopId: {
        type: DataTypes.INTEGER,
        unique:false,
        onUpdate: "Cascade",
        onDelete: "Cascade",
    },
    timeOfDeparture:{
        type: DataTypes.TIME,
        unique:false,
        onUpdate: "Cascade",
        onDelete: "Cascade",

    }
}
    ,
    {
        tableName: "StopRoute",
        underscored: true,
        timestamps: true,
    }
)



User.hasMany(userToken)
userToken.belongsTo(User)

Route.hasMany(StopRoute)
StopRoute.belongsTo(Route)
Route.belongsToMany(Stop, { through: "StopRoute" })
Stop.belongsToMany(Route, { through: "StopRoute" })


export const database = {
    sequelize,
    User,
    Stop,
    Route,
    userToken,
    StopRoute
}

//////////////////////////////////////////////////
//////////////////////////////////////////////////
//////////////////////////////////////////////////
////////////////////DODATI RELACIJE!//////////////////////////////
//////////////////////////////////////////////////
//////////////////////////////////////////////////
//////////////////////////////////////////////////
//////////////////////////////////////////////////
//////////////////////////////////////////////////