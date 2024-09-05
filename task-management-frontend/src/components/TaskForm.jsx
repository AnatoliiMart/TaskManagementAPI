import React from "react"
import { Form, Input, DatePicker, Select, Button, message } from "antd"
import { createTask, updateTask } from "../services/api"
import moment from "moment"

const { Option } = Select

const TaskForm = ({ initialValues, fetchTasks, setIsModalVisible }) => {
	const onFinish = async (values) => {
		try {
			const token = localStorage.getItem("token")
			if (initialValues) {
				await updateTask(initialValues.id, values, token)
				message.success("Task updated successfully!")
			} else {
				await createTask(values, token)
				message.success("Task added successfully!")
			}
			fetchTasks()
			setIsModalVisible(false)
		} catch (error) {
			message.error("Failed to save task.")
		}
	}

	return (
		<Form
			layout='vertical'
			initialValues={{
				...initialValues,
				dueDate: initialValues ? moment(initialValues.dueDate) : null,
				status: initialValues ? initialValues.status : "Pending",
			}}
			onFinish={onFinish}
		>
			<Form.Item
				name='title'
				label='Title'
				rules={[{ required: true, message: "Please enter a title" }]}
			>
				<Input />
			</Form.Item>
			<Form.Item name='description' label='Description'>
				<Input.TextArea />
			</Form.Item>
			<Form.Item name='dueDate' label='Due Date'>
				<DatePicker style={{ width: "100%" }} />
			</Form.Item>
			<Form.Item name='status' label='Status'>
				<Select>
					<Option value='Pending'>Pending</Option>
					<Option value='InProgress'>In Progress</Option>
					<Option value='Completed'>Completed</Option>
				</Select>
			</Form.Item>
			<Form.Item name='priority' label='Priority'>
				<Select>
					<Option value='Low'>Low</Option>
					<Option value='Medium'>Medium</Option>
					<Option value='High'>High</Option>
				</Select>
			</Form.Item>
			<Form.Item>
				<Button type='primary' htmlType='submit' block>
					Save
				</Button>
			</Form.Item>
		</Form>
	)
}

export default TaskForm
