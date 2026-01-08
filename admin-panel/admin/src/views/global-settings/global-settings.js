import React, { useState, useEffect } from 'react';
import { Steps, Card, Row } from 'antd';
import { useNavigate } from 'react-router-dom';
import { steps } from './steps';
import ProjectInfo from './project-info';
import DatabaseInfo from './database-info';
import UserInfo from './user-info';
import License from './license';
import ProjectAccessInfo from './project-access-info';
import installationService from '../../services/installation';

const { Step } = Steps;

export default function GlobalSettings() {
  const [current, setCurrent] = useState(0);
  const navigate = useNavigate();
  const next = () => setCurrent(current + 1);

  // Auto-complete installation on mount
  useEffect(() => {
    const autoInstall = async () => {
      try {
        // Auto-set init file with defaults
        await installationService.setInitFile({
          name: 'TymG',
          favicon: '',
          logo: '',
          delivery: '1',
          multy_shop: '1',
        });

        // Auto-set license (bypassed)
        await installationService.checkLicence({
          purchase_id: 'local',
          purchase_code: 'local',
        });

        // Skip to login after auto-installation
        setTimeout(() => {
          navigate('/login');
        }, 1000);
      } catch (error) {
        // Even on error, go to login
        navigate('/login');
      }
    };

    autoInstall();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className='global-settings'>
      <Card title='Project installation'>
        <Steps current={current} className='mb-2'>
          {steps.map((item) => (
            <Step key={item.title} title={item.title} />
          ))}
        </Steps>
      </Card>
      <Row hidden={steps[current].content !== 'First-content'}>
        <License next={next} />
      </Row>
      <Row hidden={steps[current].content !== 'Second-content'}>
        <ProjectInfo next={next} />
      </Row>
      <Row hidden={steps[current].content !== 'Third-content'}>
        <ProjectAccessInfo next={next} />
      </Row>
      <Row hidden={steps[current].content !== 'Fourth-content'}>
        <DatabaseInfo next={next} />
      </Row>
      <Row hidden={steps[current].content !== 'Fifth-content'}>
        <UserInfo />
      </Row>
    </div>
  );
}
