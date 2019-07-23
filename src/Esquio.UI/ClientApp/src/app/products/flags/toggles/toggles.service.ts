import { injectable } from 'inversify-props';
import { settings } from '~/core';
import { ITogglesService } from './itoggles.service';
import { Toggle } from './toggle.model';
import { ToggleParameter } from './toggle-parameter.model';

@injectable()
export class TogglesService implements ITogglesService {
  public async detail(id: number): Promise<Toggle> {
    const response = await fetch(`${settings.ApiUrl}/v1/toggles/${id}`);

    if (!response.ok) {
      throw new Error(`Cannot fetch toggle ${id}`);
    }

    return response.json();
  }

  public async add(featureId: number, toggle: Toggle): Promise<void> {
    const response = await fetch(`${settings.ApiUrl}/v1/toggles`, {
      method: 'POST',
      body: JSON.stringify({featureId, ...toggle})
    });

    if (!response.ok) {
      throw new Error(`Cannot create toggle ${toggle.id}`);
    }
  }

  public async addParameter(toggle: Toggle, parameter: ToggleParameter): Promise<void> {
    const response = await fetch(`${settings.ApiUrl}/v1/toggles/${toggle.id}/parameters`, {
      method: 'POST',
      body: JSON.stringify(parameter)
    });

    if (!response.ok) {
      throw new Error(`Cannot add parameters to toggle ${toggle.id}`);
    }
  }

  public async remove(toggle: Toggle): Promise<void> {
    const response = await fetch(`${settings.ApiUrl}/v1/toggles/${toggle.id}`, {
      method: 'DELETE'
    });

    if (!response.ok) {
      throw new Error(`Cannot delete toggle ${toggle.id}`);
    }
  }
}

