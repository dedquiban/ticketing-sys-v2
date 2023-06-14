const express = require('express');
const app = express();
const PORT = 8080;
const cors = require('cors');

app.use(express.json());
app.use(cors());

app.use(express.urlencoded({ extended: true }));

const db = require('./models');

const userRouter = require('./routes/Users');
app.use('/users', userRouter);

const ticketRouter = require('./routes/Tickets');
app.use('/tickets', ticketRouter);

const ticketCategoriesRouter = require('./routes/TicketCategories');
app.use('/ticketCategories', ticketCategoriesRouter);

const ticketStatusesRouter = require('./routes/TicketStatuses');
app.use('/ticketStatuses', ticketStatusesRouter);

const ticketPriorityLevelsRouter = require('./routes/TicketPriorityLevels');
app.use('/ticketPriorityLevels', ticketPriorityLevelsRouter);

const ticketCommentsRouter = require('./routes/TicketComments');
app.use('/ticketComments', ticketCommentsRouter);

const departmentRouter = require('./routes/Departments');
app.use('/departments', departmentRouter);

const rolesRouter = require('./routes/Roles');
app.use('/roles', rolesRouter);

const permissionsRouter = require('./routes/Permissions');
app.use('/permissions', permissionsRouter);

const rolePermissionRouter = require('./routes/RolePermission');
app.use('/rolePermission', rolePermissionRouter);

db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log('Server is running on port ' + PORT);
  });
});
