import {
  useContext,
  useEffect,
  useState,
} from 'react';

import {
  Link,
  useParams,
} from 'react-router';

import { UserContext } from '../../contexts/UserContext';

import {
  addProjectMember,
  createProjectUpdate,
  getProject,
  getProjectMembers,
  getProjectUpdates,
  removeProjectMember,
  updateMemberApproval,
  updateProjectMeeting,
  updateProjectWork,
} from '../../services/projectService';

import { getUsers } from '../../services/userService';

import './ProjectDetails.css';


const ProjectDetails = () => {
  const { projectId } = useParams();
  const { user } = useContext(UserContext);

  const [project, setProject] = useState(null);
  const [members, setMembers] = useState([]);
  const [updates, setUpdates] = useState([]);
  const [engineers, setEngineers] = useState([]);

  const [message, setMessage] = useState('');
  const [newUpdate, setNewUpdate] = useState('');

  const [workData, setWorkData] = useState({
    status: '',
    progress: 0,
  });

  const [meetingData, setMeetingData] = useState({
    meeting_title: '',
    meeting_date: '',
    meeting_time: '',
    meeting_type: 'online',
    meeting_link: '',
  });

  const [selectedEngineer, setSelectedEngineer] =
    useState('');

  const [discipline, setDiscipline] =
    useState('');

  const [approvalNote, setApprovalNote] =
    useState('');


  const loadProjectRoom = async () => {
    try {
      const [
        projectData,
        memberData,
        updateData,
      ] = await Promise.all([
        getProject(projectId),
        getProjectMembers(projectId),
        getProjectUpdates(projectId),
      ]);

      setProject(projectData);
      setMembers(memberData);
      setUpdates(updateData);

      setWorkData({
        status: projectData.status || 'pending',
        progress: projectData.progress || 0,
      });

      let meetingDate = '';
      let meetingTime = '';

      if (projectData.meeting_at) {
        const value =
          projectData.meeting_at.split('T');

        meetingDate = value[0] || '';
        meetingTime =
          value[1]?.slice(0, 5) || '';
      }

      setMeetingData({
        meeting_title:
          projectData.meeting_title || '',
        meeting_date: meetingDate,
        meeting_time: meetingTime,
        meeting_type:
          projectData.meeting_type || 'online',
        meeting_link:
          projectData.meeting_link || '',
      });

      if (user?.role === 'admin') {
        const users = await getUsers();

        setEngineers(
          users.filter(
            (item) => item.role === 'engineer'
          )
        );
      }
    } catch (err) {
      setMessage(err.message);
    }
  };


  useEffect(() => {
    loadProjectRoom();
  }, [projectId, user?.role]);


  const handlePostUpdate = async (evt) => {
    evt.preventDefault();

    if (!newUpdate.trim()) {
      return;
    }

    try {
      await createProjectUpdate(projectId, {
        message: newUpdate,
      });

      setNewUpdate('');
      await loadProjectRoom();
    } catch (err) {
      setMessage(err.message);
    }
  };


  const handleWorkUpdate = async (evt) => {
    evt.preventDefault();

    try {
      await updateProjectWork(projectId, {
        status: workData.status,
        progress: Number(workData.progress),
      });

      await loadProjectRoom();
    } catch (err) {
      setMessage(err.message);
    }
  };


  const handleMeetingUpdate = async (evt) => {
    evt.preventDefault();

    let meetingAt = null;

    if (
      meetingData.meeting_date &&
      meetingData.meeting_time
    ) {
      meetingAt =
        `${meetingData.meeting_date}` +
        `T${meetingData.meeting_time}:00`;
    }

    try {
      await updateProjectMeeting(projectId, {
        meeting_title:
          meetingData.meeting_title,
        meeting_at: meetingAt,
        meeting_type:
          meetingData.meeting_type,
        meeting_link:
          meetingData.meeting_link,
      });

      await loadProjectRoom();
    } catch (err) {
      setMessage(err.message);
    }
  };


  const handleApproval = async (member) => {
    try {
      await updateMemberApproval(
        projectId,
        member.id,
        {
          approved: !member.approved,
          approval_note: approvalNote,
        }
      );

      setApprovalNote('');
      await loadProjectRoom();
    } catch (err) {
      setMessage(err.message);
    }
  };


  const handleAssignEngineer = async (evt) => {
    evt.preventDefault();

    if (!selectedEngineer || !discipline) {
      return;
    }

    try {
      await addProjectMember(projectId, {
        user_id: Number(selectedEngineer),
        discipline,
      });

      setSelectedEngineer('');
      setDiscipline('');

      await loadProjectRoom();
    } catch (err) {
      setMessage(err.message);
    }
  };


  const handleRemoveEngineer = async (memberId) => {
    try {
      await removeProjectMember(
        projectId,
        memberId
      );

      await loadProjectRoom();
    } catch (err) {
      setMessage(err.message);
    }
  };


  if (message && !project) {
    return (
      <main className="project-details-page">
        <p className="project-details-message">
          {message}
        </p>
      </main>
    );
  }


  if (!project) {
    return (
      <main className="project-details-page">
        <p className="project-details-loading">
          Loading project...
        </p>
      </main>
    );
  }


  const approvedCount = members.filter(
    (member) => member.approved
  ).length;

  const myMember = members.find(
    (member) => member.user_id === user?.id
  );

  const canManageWork =
    user?.role === 'engineer' ||
    user?.role === 'admin';

  const canManageMeeting = canManageWork;


  return (
    <main className="project-details-page">

      <Link
        to="/projects"
        className="project-details-back"
      >
        ← Back to Projects
      </Link>


      <section className="project-details-header">
        <div>
          <p className="project-details-label">
            {project.project_type}
          </p>

          <h1>{project.title}</h1>

          <p className="project-details-location">
            {project.location}
          </p>
        </div>

        <span className="project-details-status">
          {project.status.replace('_', ' ')}
        </span>
      </section>


      {project.image_url && (
        <section className="project-details-image">
          <img
            src={project.image_url}
            alt={project.title}
          />
        </section>
      )}


      <section className="project-details-layout">

        <div className="project-details-main">

          <div className="project-details-section">
            <p className="project-details-small-label">
              Project Description
            </p>

            <h2>About this project</h2>

            <p className="project-details-description">
              {project.description ||
                'No description provided.'}
            </p>
          </div>


          <div className="project-details-info-grid">

            <div className="project-info-box">
              <span>Project Type</span>
              <strong>
                {project.project_type}
              </strong>
            </div>

            <div className="project-info-box">
              <span>Location</span>
              <strong>
                {project.location}
              </strong>
            </div>

            <div className="project-info-box">
              <span>Budget Range</span>
              <strong>
                {project.budget_range ||
                  'Not specified'}
              </strong>
            </div>

            <div className="project-info-box">
              <span>Engineering Team</span>
              <strong>
                {members.length} assigned
              </strong>
            </div>

          </div>
        </div>


        <aside className="project-details-sidebar">

          <div className="project-progress-card">
            <p>Project Progress</p>

            <div className="project-progress-value">
              {project.progress || 0}
              <span>%</span>
            </div>

            <div className="project-details-progress-track">
              <div
                className="project-details-progress-fill"
                style={{
                  width:
                    `${project.progress || 0}%`,
                }}
              />
            </div>

            <span className="project-progress-text">
              {approvedCount} of {members.length}
              {' '}disciplines approved
            </span>
          </div>


          {user?.role === 'client' && (
            <Link
              to={`/projects/${project.id}/edit`}
              className="project-details-edit"
            >
              Edit Project
              <span>→</span>
            </Link>
          )}

        </aside>
      </section>


      <section className="project-collaboration">

        <div className="project-collaboration-heading">
          <p>Project Workspace</p>
          <h2>Project Room</h2>
        </div>


        <div className="project-collaboration-grid">

          <div>

            <div className="project-workspace-panel">
              <h3>Engineering Team</h3>

              {members.length === 0 ? (
                <p>
                  No engineers assigned yet.
                </p>
              ) : (
                <div className="project-team-list">

                  {members.map((member) => (
                    <div
                      className="project-member-row"
                      key={member.id}
                    >

                      <div className="project-member-main">
                        <div>
                          <strong>
                            {member.user_name}
                          </strong>

                          <p>
                            {member.discipline}
                          </p>
                        </div>

                        <span
                          className={
                            member.approved
                              ? 'project-member-status approved'
                              : 'project-member-status'
                          }
                        >
                          {member.approved
                            ? 'Approved'
                            : 'Pending'}
                        </span>
                      </div>


                      {member.approval_note && (
                        <p className="project-member-note">
                          {member.approval_note}
                        </p>
                      )}


                      {user?.role === 'admin' && (
                        <button
                          type="button"
                          className="project-approval-button"
                          onClick={() =>
                            handleRemoveEngineer(
                              member.id
                            )
                          }
                        >
                          Remove from Project
                        </button>
                      )}

                    </div>
                  ))}

                </div>
              )}


              {myMember &&
                user?.role === 'engineer' && (
                  <div className="project-shared-note">

                    <span>
                      My Discipline Approval
                    </span>

                    <textarea
                      value={approvalNote}
                      onChange={(evt) =>
                        setApprovalNote(
                          evt.target.value
                        )
                      }
                      placeholder="Add a short approval note..."
                    />

                    <button
                      type="button"
                      className={
                        myMember.approved
                          ? 'project-approval-button approved'
                          : 'project-approval-button'
                      }
                      onClick={() =>
                        handleApproval(myMember)
                      }
                    >
                      {myMember.approved
                        ? 'Undo My Approval'
                        : 'Approve My Discipline'}
                    </button>

                  </div>
                )}
            </div>


            {user?.role === 'admin' && (
              <div className="project-workspace-panel">

                <h3>Assign Engineer</h3>

                <form
                  className="project-coordination-form"
                  onSubmit={
                    handleAssignEngineer
                  }
                >

                  <label>
                    Engineer
                  </label>

                  <select
                    value={selectedEngineer}
                    onChange={(evt) =>
                      setSelectedEngineer(
                        evt.target.value
                      )
                    }
                  >
                    <option value="">
                      Select engineer
                    </option>

                    {engineers.map(
                      (engineer) => (
                        <option
                          key={engineer.id}
                          value={engineer.id}
                        >
                          {engineer.name}
                          {engineer.specialty
                            ? ` — ${engineer.specialty}`
                            : ''}
                        </option>
                      )
                    )}
                  </select>


                  <label>
                    Project Discipline
                  </label>

                  <input
                    value={discipline}
                    onChange={(evt) =>
                      setDiscipline(
                        evt.target.value
                      )
                    }
                    placeholder="Example: Civil Engineering"
                  />

                  <button
                    className="project-coordination-button"
                    type="submit"
                  >
                    Assign to Project
                  </button>

                </form>
              </div>
            )}


            <div className="project-workspace-panel">
              <h3>Project Updates</h3>

              <form
                className="project-coordination-form"
                onSubmit={handlePostUpdate}
              >

                <textarea
                  value={newUpdate}
                  onChange={(evt) =>
                    setNewUpdate(
                      evt.target.value
                    )
                  }
                  placeholder={
                    user?.role === 'client'
                      ? 'Ask the project team or leave an update...'
                      : 'Share an update with the project team...'
                  }
                />

                <button
                  className="project-coordination-button"
                  type="submit"
                >
                  Post Update
                </button>
              </form>


              <div className="project-team-list">

                {updates.length === 0 && (
                  <p>
                    No project updates yet.
                  </p>
                )}

                {updates.map((update) => (
                  <div
                    className="project-member-row"
                    key={update.id}
                  >

                    <div className="project-member-main">
                      <div>
                        <strong>
                          {update.author_name}
                        </strong>

                        <p>
                          {update.author_role}
                          {' · '}
                          {new Date(
                            update.created_at
                          ).toLocaleDateString()}
                        </p>
                      </div>
                    </div>

                    <p className="project-member-note">
                      {update.message}
                    </p>

                  </div>
                ))}

              </div>
            </div>

          </div>


          <div>

            <div className="project-workspace-panel">
              <h3>
                Next Coordination Meeting
              </h3>

              {project.meeting_at ? (
                <div className="project-meeting">

                  <span>
                    {project.meeting_type ===
                    'online'
                      ? 'Google Meet'
                      : 'In Person'}
                  </span>

                  <strong>
                    {project.meeting_title ||
                      'Project Coordination'}
                  </strong>

                  <p>
                    {new Date(
                      project.meeting_at
                    ).toLocaleString()}
                  </p>

                  {project.meeting_type ===
                    'online' &&
                    project.meeting_link && (
                      <a
                        href={
                          project.meeting_link
                        }
                        target="_blank"
                        rel="noreferrer"
                        className="project-meeting-link"
                      >
                        Join Google Meet
                      </a>
                    )}

                </div>
              ) : (
                <p>
                  No coordination meeting
                  scheduled.
                </p>
              )}
            </div>


            {canManageWork && (
              <div className="project-workspace-panel">

                <h3>
                  Project Progress
                </h3>

                <form
                  className="project-coordination-form"
                  onSubmit={handleWorkUpdate}
                >

                  <label>
                    Status
                  </label>

                  <select
                    value={workData.status}
                    onChange={(evt) =>
                      setWorkData({
                        ...workData,
                        status:
                          evt.target.value,
                      })
                    }
                  >
                    <option value="pending">
                      Pending
                    </option>

                    <option value="in_progress">
                      In Progress
                    </option>

                    <option value="client_review">
                      Client Review
                    </option>

                    <option value="completed">
                      Completed
                    </option>
                  </select>


                  <label>
                    Overall Progress
                  </label>

                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={workData.progress}
                    onChange={(evt) =>
                      setWorkData({
                        ...workData,
                        progress:
                          evt.target.value,
                      })
                    }
                  />

                  <button
                    className="project-coordination-button"
                    type="submit"
                  >
                    Update Project
                  </button>

                </form>
              </div>
            )}


            {canManageMeeting && (
              <div className="project-workspace-panel">

                <h3>
                  Coordination Meeting
                </h3>

                <form
                  className="project-coordination-form"
                  onSubmit={
                    handleMeetingUpdate
                  }
                >

                  <label>
                    Meeting Title
                  </label>

                  <input
                    value={
                      meetingData.meeting_title
                    }
                    onChange={(evt) =>
                      setMeetingData({
                        ...meetingData,
                        meeting_title:
                          evt.target.value,
                      })
                    }
                    placeholder="Design Coordination"
                  />


                  <div className="project-coordination-row">

                    <div>
                      <label>Date</label>

                      <input
                        type="date"
                        value={
                          meetingData.meeting_date
                        }
                        onChange={(evt) =>
                          setMeetingData({
                            ...meetingData,
                            meeting_date:
                              evt.target.value,
                          })
                        }
                      />
                    </div>


                    <div>
                      <label>Time</label>

                      <input
                        type="time"
                        value={
                          meetingData.meeting_time
                        }
                        onChange={(evt) =>
                          setMeetingData({
                            ...meetingData,
                            meeting_time:
                              evt.target.value,
                          })
                        }
                      />
                    </div>

                  </div>


                  <label>
                    Meeting Type
                  </label>

                  <select
                    value={
                      meetingData.meeting_type
                    }
                    onChange={(evt) =>
                      setMeetingData({
                        ...meetingData,
                        meeting_type:
                          evt.target.value,
                      })
                    }
                  >
                    <option value="online">
                      Google Meet
                    </option>

                    <option value="in_person">
                      In Person
                    </option>
                  </select>


                  {meetingData.meeting_type ===
                    'online' && (
                    <>
                      <label>
                        Google Meet Link
                      </label>

                      <input
                        value={
                          meetingData.meeting_link
                        }
                        onChange={(evt) =>
                          setMeetingData({
                            ...meetingData,
                            meeting_link:
                              evt.target.value,
                          })
                        }
                        placeholder="https://meet.google.com/..."
                      />
                    </>
                  )}


                  <button
                    className="project-coordination-button"
                    type="submit"
                  >
                    Save Meeting
                  </button>

                </form>
              </div>
            )}

          </div>

        </div>
      </section>


      {message && (
        <p className="project-details-message">
          {message}
        </p>
      )}

    </main>
  );
};


export default ProjectDetails;
