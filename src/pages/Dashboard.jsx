import React from 'react'
import { useTeam } from '../context/TeamContext'
import { useTasks } from '../context/TaskContext'
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  ComposedChart, Line, ResponsiveContainer,
  RadialBarChart, RadialBar,
  PieChart, Pie, Cell
} from 'recharts'

export default function Dashboard() {
  const { teamMembers } = useTeam()
  const { tasks } = useTasks()

  // Calculate task statistics
  const taskStats = {
    total: tasks.length,
    completed: tasks.filter(t => t.status === 'Completed').length,
    inProgress: tasks.filter(t => t.status === 'In Progress').length,
    todo: tasks.filter(t => t.status === 'To Do').length,
    highPriority: tasks.filter(t => t.priority === 'High').length,
    upcomingDeadlines: tasks.filter(t => {
      const dueDate = new Date(t.dueDate)
      const today = new Date()
      const diffDays = Math.ceil((dueDate - today) / (1000 * 60 * 60 * 24))
      return diffDays <= 7 && diffDays > 0
    }).length
  }

  // Resource workload data
  const resourceWorkload = teamMembers?.map(member => ({
    name: member.name,
    assigned: tasks.filter(t => t.assignees.includes(member.id)).length,
    completed: tasks.filter(t => t.assignees.includes(member.id) && t.status === 'Completed').length,
    availability: member.status === 'Active' ? 100 : member.status === 'Busy' ? 50 : 0
  }))

  // Project timeline data
  const projectTimeline = [
    { name: 'Design', start: '2025-05-01', end: '2025-05-15', completed: 80 },
    { name: 'Development', start: '2025-05-10', end: '2025-06-15', completed: 45 },
    { name: 'Testing', start: '2025-06-01', end: '2025-06-30', completed: 20 },
    { name: 'Deployment', start: '2025-06-25', end: '2025-07-10', completed: 0 }
  ]

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']

  // Add new statistics
  const projectHealth = {
    onTrack: tasks.filter(t => {
      if (!t.actualStartDate || !t.estimatedEndDate) return true;
      const today = new Date();
      const endDate = new Date(t.estimatedEndDate);
      return today <= endDate;
    }).length,
    delayed: tasks.filter(t => {
      if (!t.actualStartDate || !t.estimatedEndDate) return false;
      const today = new Date();
      const endDate = new Date(t.estimatedEndDate);
      return today > endDate && t.status !== 'Completed';
    }).length,
    completed: taskStats.completed
  }

  // Calculate team performance
  const teamPerformance = teamMembers?.map(member => ({
    name: member.name,
    performance: Math.round(
      (tasks.filter(t => 
        t.assignees.includes(member.id) && 
        t.status === 'Completed'
      ).length /
      Math.max(tasks.filter(t => 
        t.assignees.includes(member.id)
      ).length, 1)) * 100
    )
  }))

  const generateWorkloadData = () => {
    return teamMembers?.map(member => {
      const memberTasks = tasks.filter(t => t.assignees.includes(member.id))
      return {
        name: member.name,
        assigned: memberTasks.length,
        completed: memberTasks.filter(t => t.status === 'Completed').length,
        inProgress: memberTasks.filter(t => t.status === 'In Progress').length,
        todo: memberTasks.filter(t => t.status === 'To Do').length,
        highPriority: memberTasks.filter(t => t.priority === 'High').length,
        efficiency: memberTasks.length > 0 
          ? Math.round((memberTasks.filter(t => t.status === 'Completed').length / memberTasks.length) * 100)
          : 0
      }
    })
  }

  return (
    <div className="space-y-6">
      {/* Quick Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
        <div className="bg-white p-3 rounded-lg shadow text-center">
          <h3 className="text-gray-500 text-xs">Total Tasks</h3>
          <p className="text-xl font-bold">{taskStats.total}</p>
        </div>
        <div className="bg-white p-3 rounded-lg shadow text-center">
          <h3 className="text-gray-500 text-xs">Completed</h3>
          <p className="text-xl font-bold text-green-600">{taskStats.completed}</p>
        </div>
        <div className="bg-white p-3 rounded-lg shadow text-center">
          <h3 className="text-gray-500 text-xs">In Progress</h3>
          <p className="text-xl font-bold text-blue-600">{taskStats.inProgress}</p>
        </div>
        <div className="bg-white p-3 rounded-lg shadow text-center">
          <h3 className="text-gray-500 text-xs">To Do</h3>
          <p className="text-xl font-bold text-gray-600">{taskStats.todo}</p>
        </div>
        <div className="bg-white p-3 rounded-lg shadow text-center">
          <h3 className="text-gray-500 text-xs">High Priority</h3>
          <p className="text-xl font-bold text-red-600">{taskStats.highPriority}</p>
        </div>
        <div className="bg-white p-3 rounded-lg shadow text-center">
          <h3 className="text-gray-500 text-xs">Due Soon</h3>
          <p className="text-xl font-bold text-yellow-600">{taskStats.upcomingDeadlines}</p>
        </div>
      </div>

      {/* Add Project Health Card */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4 rounded-lg shadow">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold mb-2">Project Health Overview</h2>
            <p className="text-sm opacity-90">Based on timeline and completion rates</p>
          </div>
          <div className="text-right">
            <p className="text-3xl font-bold">
              {Math.round((projectHealth.onTrack / tasks.length) * 100)}%
            </p>
            <p className="text-sm">On Track</p>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4 mt-4">
          <div className="text-center p-3 bg-white/10 rounded">
            <p className="text-2xl font-bold">{projectHealth.onTrack}</p>
            <p className="text-xs">On Schedule</p>
          </div>
          <div className="text-center p-3 bg-white/10 rounded">
            <p className="text-2xl font-bold">{projectHealth.delayed}</p>
            <p className="text-xs">Delayed</p>
          </div>
          <div className="text-center p-3 bg-white/10 rounded">
            <p className="text-2xl font-bold">{projectHealth.completed}</p>
            <p className="text-xs">Completed</p>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Resource Workload */}
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold">Resource Workload</h2>
            <div className="flex space-x-2">
              <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">
                Total Tasks: {tasks.length}
              </span>
              <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                Completed: {tasks.filter(t => t.status === 'Completed').length}
              </span>
            </div>
          </div>

          <div className="space-y-8">
            <ResponsiveContainer width="100%" height={300}>
              <ComposedChart data={generateWorkloadData()}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Legend />
                <Bar dataKey="assigned" fill="#8884d8" name="Total Tasks" yAxisId="left" />
                <Bar dataKey="completed" fill="#82ca9d" name="Completed" yAxisId="left" />
                <Bar dataKey="inProgress" fill="#ffc658" name="In Progress" yAxisId="left" />
                <Line
                  type="monotone"
                  dataKey="efficiency"
                  stroke="#ff7300"
                  name="Efficiency %"
                  yAxisId="right"
                  strokeWidth={2}
                />
              </ComposedChart>
            </ResponsiveContainer>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {generateWorkloadData().map(member => (
                <div key={member.name} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <h3 className="font-semibold">{member.name}</h3>
                      <p className="text-sm text-gray-500">
                        {member.assigned} total tasks assigned
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-blue-600">
                        {member.efficiency}%
                      </p>
                      <p className="text-xs text-gray-500">Efficiency</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm mb-1">
                      <span>Task Progress</span>
                      <span>{Math.round((member.completed / member.assigned) * 100) || 0}%</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-blue-500 to-blue-600"
                        style={{ width: `${(member.completed / member.assigned) * 100 || 0}%` }}
                      />
                    </div>

                    <div className="grid grid-cols-3 gap-2 mt-4">
                      <div className="text-center p-2 bg-purple-50 rounded">
                        <p className="text-lg font-semibold text-purple-600">{member.todo}</p>
                        <p className="text-xs text-gray-500">To Do</p>
                      </div>
                      <div className="text-center p-2 bg-yellow-50 rounded">
                        <p className="text-lg font-semibold text-yellow-600">{member.inProgress}</p>
                        <p className="text-xs text-gray-500">In Progress</p>
                      </div>
                      <div className="text-center p-2 bg-green-50 rounded">
                        <p className="text-lg font-semibold text-green-600">{member.completed}</p>
                        <p className="text-xs text-gray-500">Completed</p>
                      </div>
                    </div>

                    <div className="mt-4">
                      <div className="flex justify-between text-sm mb-1">
                        <span>High Priority Tasks</span>
                        <span className="text-red-600">{member.highPriority}</span>
                      </div>
                      <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-red-500"
                          style={{ width: `${(member.highPriority / member.assigned) * 100 || 0}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Resource Availability */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Resource Availability</h2>
          <div className="space-y-3">
            {teamMembers?.map(member => (
              <div key={member.id} className="flex items-center justify-between border-b pb-2">
                <div className="flex items-center space-x-4 w-1/3">
                  <span className="text-xl">{member.avatar}</span>
                  <div>
                    <p className="font-medium">{member.name}</p>
                    <p className="text-sm text-gray-500">{member.role}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4 w-1/3">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    member.status === 'Active' ? 'bg-green-100 text-green-800' :
                    member.status === 'Busy' ? 'bg-yellow-100 text-yellow-800' :
                    member.status === 'On Leave' ? 'bg-red-100 text-red-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {member.status}
                  </span>
                  <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className={`h-full transition-all ${
                        member.status === 'Active' ? 'bg-green-500' :
                        member.status === 'Busy' ? 'bg-yellow-500' :
                        'bg-gray-500'
                      }`}
                      style={{ 
                        width: `${member.status === 'Active' ? '100' :
                                member.status === 'Busy' ? '50' :
                                '0'}%` 
                      }}
                    />
                  </div>
                </div>
                <div className="text-right w-1/3">
                  <p className="text-sm text-gray-500">
                    Tasks: {tasks.filter(t => t.assignees.includes(member.id)).length}
                  </p>
                  <p className="text-xs text-gray-400">
                    Completed: {tasks.filter(t => 
                      t.assignees.includes(member.id) && 
                      t.status === 'Completed'
                    ).length}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Project Timeline */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Project Timeline</h2>
          <div className="space-y-4">
            {projectTimeline.map(phase => (
              <div key={phase.name} className="space-y-2">
                <div className="flex justify-between">
                  <span className="font-medium">{phase.name}</span>
                  <span className="text-sm text-gray-500">
                    {new Date(phase.start).toLocaleDateString()} - {new Date(phase.end).toLocaleDateString()}
                  </span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-blue-500"
                    style={{ width: `${phase.completed}%` }}
                  />
                </div>
                <div className="text-right text-sm text-gray-600">{phase.completed}% Complete</div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Deadlines */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Upcoming Deadlines</h2>
          <div className="space-y-3">
            {tasks
              .filter(task => {
                const dueDate = new Date(task.dueDate)
                const today = new Date()
                const diffDays = Math.ceil((dueDate - today) / (1000 * 60 * 60 * 24))
                return diffDays <= 7 && diffDays > 0
              })
              .map(task => (
                <div key={task.id} className="flex justify-between items-center border-b pb-2">
                  <div>
                    <h3 className="font-medium">{task.title}</h3>
                    <p className="text-sm text-gray-500">
                      Assigned to: {teamMembers?.find(m => task.assignees.includes(m.id))?.name}
                    </p>
                  </div>
                  <div className="text-sm">
                    <p className="text-gray-500">Due: {new Date(task.dueDate).toLocaleDateString()}</p>
                    <p className={`text-right ${
                      task.priority === 'High' ? 'text-red-600' :
                      task.priority === 'Medium' ? 'text-yellow-600' :
                      'text-green-600'
                    }`}>
                      {task.priority} Priority
                    </p>
                  </div>
                </div>
              ))}
          </div>
        </div>

        {/* Timeline Comparison */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Timeline Comparison</h2>
          <div className="space-y-4">
            {tasks
              .filter(task => task.estimatedStartDate && task.estimatedEndDate)
              .map(task => {
                const estimatedDays = Math.ceil(
                  (new Date(task.estimatedEndDate) - new Date(task.estimatedStartDate)) / (1000 * 60 * 60 * 24)
                )
                const actualDays = task.actualEndDate ? Math.ceil(
                  (new Date(task.actualEndDate) - new Date(task.actualStartDate)) / (1000 * 60 * 60 * 24)
                ) : 0
                
                return (
                  <div key={task.id} className="space-y-2">
                    <div className="flex justify-between">
                      <span className="font-medium">{task.title}</span>
                      <span className="text-sm text-gray-500">
                        {estimatedDays} days estimated
                        {actualDays ? ` / ${actualDays} days actual` : ''}
                      </span>
                    </div>
                    <div className="relative h-6">
                      {/* Estimated timeline */}
                      <div className="absolute top-0 h-3 bg-blue-200 rounded-full"
                        style={{ 
                          width: '100%',
                          opacity: 0.5 
                        }}
                      />
                      {/* Actual timeline */}
                      {task.actualStartDate && (
                        <div className="absolute bottom-0 h-3 bg-blue-600 rounded-full"
                          style={{ 
                            width: `${(actualDays / estimatedDays) * 100}%`,
                            maxWidth: '100%'
                          }}
                        />
                      )}
                    </div>
                    <div className="flex justify-between text-sm text-gray-500">
                      <span>{new Date(task.estimatedStartDate).toLocaleDateString()}</span>
                      <span>{new Date(task.estimatedEndDate).toLocaleDateString()}</span>
                    </div>
                  </div>
                )
              })}
          </div>
        </div>

        {/* Add Team Performance Chart */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Team Performance</h2>
          <ResponsiveContainer width="100%" height={300}>
            <RadialBarChart 
              innerRadius="30%" 
              outerRadius="100%" 
              data={teamPerformance} 
              startAngle={180} 
              endAngle={0}
            >
              <RadialBar
                minAngle={15}
                label={{ fill: '#666', position: 'insideStart' }}
                background
                clockWise={true}
                dataKey="performance"
                cornerRadius={10}
              />
              <Legend />
              <Tooltip />
            </RadialBarChart>
          </ResponsiveContainer>
        </div>

        {/* Add Task Priority Distribution */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Priority Distribution</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={[
                  { name: 'High', value: tasks.filter(t => t.priority === 'High').length },
                  { name: 'Medium', value: tasks.filter(t => t.priority === 'Medium').length },
                  { name: 'Low', value: tasks.filter(t => t.priority === 'Low').length }
                ]}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                fill="#8884d8"
                paddingAngle={5}
                dataKey="value"
              >
                {tasks.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Add Recent Activity Timeline */}
      <div className="bg-white p-4 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
        <div className="space-y-4">
          {tasks
            .sort((a, b) => new Date(b.updatedAt || b.createdAt) - new Date(a.updatedAt || a.createdAt))
            .slice(0, 5)
            .map(task => (
              <div key={task.id} className="flex items-center space-x-4">
                <div className={`w-2 h-2 rounded-full ${
                  task.status === 'Completed' ? 'bg-green-500' :
                  task.status === 'In Progress' ? 'bg-blue-500' :
                  'bg-gray-500'
                }`} />
                <div className="flex-1">
                  <p className="font-medium">{task.title}</p>
                  <p className="text-sm text-gray-500">
                    {task.status} • Assigned to: {
                      teamMembers?.find(m => task.assignees.includes(m.id))?.name
                    }
                  </p>
                </div>
                <div className="text-sm text-gray-500">
                  {new Date(task.updatedAt || task.createdAt).toLocaleDateString()}
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}
